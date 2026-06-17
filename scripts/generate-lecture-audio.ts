/**
 * generate-lecture-audio.ts
 *
 * Renders every lecture beat × coach into an MP3 via ElevenLabs Flash TTS,
 * uploads to the `lecture-audio` Supabase storage bucket, and writes a
 * manifest row to `lecture_audio`.
 *
 * Idempotent: skips beats whose text_hash matches the stored hash.
 * Retries with exponential backoff on transient errors.
 *
 * Run: npm run generate-audio   (from scripts/)
 *
 * BEFORE RUNNING: fill in the 5 VOICE_ID_* values in your .env file.
 * Clone each coach voice in the ElevenLabs dashboard (Voices → Add Voice →
 * Instant Voice Clone) using the MP3s in /Charmster ai avatars/coach voices/.
 */

import { createClient } from "@supabase/supabase-js"
import { createHash } from "node:crypto"
import * as dotenv from "dotenv"

dotenv.config()

const EL_KEY = process.env.ELEVENLABS_API_KEY!
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BUCKET = "lecture-audio"
const EL_MODEL = "eleven_flash_v2_5"

const COACHES = {
  theo: {
    voiceId: process.env.VOICE_ID_THEO!,
    settings: { stability: 0.55, similarity_boost: 0.85, style: 0.25 },
  },
  dr_ray: {
    voiceId: process.env.VOICE_ID_DR_RAY!,
    settings: { stability: 0.65, similarity_boost: 0.85, style: 0.10 },
  },
  cole: {
    voiceId: process.env.VOICE_ID_COLE!,
    settings: { stability: 0.60, similarity_boost: 0.85, style: 0.35 },
  },
  noah: {
    voiceId: process.env.VOICE_ID_NOAH!,
    settings: { stability: 0.70, similarity_boost: 0.85, style: 0.10 },
  },
  leo: {
    voiceId: process.env.VOICE_ID_LEO!,
    settings: { stability: 0.45, similarity_boost: 0.85, style: 0.55 },
  },
} as const

type CoachId = keyof typeof COACHES

interface CoachScript {
  hook: string
  coreInsight: string
  goodVsBad: string
  recall?: { question?: string; why?: string }
  takeawayHandoff: string
}

function beatsToRender(s: CoachScript): Array<[string, string]> {
  const out: Array<[string, string]> = [
    ["hook", s.hook],
    ["coreInsight", s.coreInsight],
    ["goodVsBad", s.goodVsBad],
    ["takeawayHandoff", s.takeawayHandoff],
  ]
  if (s.recall?.question) out.push(["recallQuestion", s.recall.question])
  if (s.recall?.why) out.push(["recallWhy", s.recall.why])
  return out.filter(([, t]) => t?.trim().length)
}

async function tts(
  text: string,
  voiceId: string,
  settings: Record<string, number>
): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": EL_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: EL_MODEL,
        voice_settings: settings,
      }),
    }
  )
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`ElevenLabs ${res.status}: ${body}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

async function withRetry<T>(fn: () => Promise<T>, tries = 4): Promise<T> {
  let last: unknown
  for (let i = 0; i < tries; i++) {
    try {
      return await fn()
    } catch (e) {
      last = e
      const delay = 1000 * 2 ** i
      console.warn(`  retry ${i + 1}/${tries} in ${delay}ms`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw last
}

async function run() {
  // Validate voice IDs
  const missingVoices = (Object.entries(COACHES) as [CoachId, (typeof COACHES)[CoachId]][])
    .filter(([, c]) => !c.voiceId)
    .map(([id]) => id)
  if (missingVoices.length) {
    console.error(`Missing voice IDs in .env: ${missingVoices.map((id) => `VOICE_ID_${id.toUpperCase()}`).join(", ")}`)
    console.error("Clone the voices in ElevenLabs dashboard first (see README).")
    process.exit(1)
  }

  const { data: lectures, error } = await supabase
    .from("lectures")
    .select("id, title, format, coach_scripts")
    .order("id")

  if (error) throw error

  const eligible = (lectures ?? []).filter(
    (l) =>
      l.format !== "assessment" &&
      l.coach_scripts &&
      Object.keys(l.coach_scripts).includes("theo")
  )

  console.log(`Lectures with structured coach_scripts: ${eligible.length}`)

  let totalRendered = 0
  let totalSkipped = 0
  let totalFailed = 0

  for (const lec of eligible) {
    for (const [coachId, coach] of Object.entries(COACHES) as [CoachId, (typeof COACHES)[CoachId]][]) {
      const script = lec.coach_scripts?.[coachId] as CoachScript | undefined
      if (!script) continue

      for (const [beatId, text] of beatsToRender(script)) {
        const hash = createHash("sha1")
          .update(EL_MODEL + coach.voiceId + text)
          .digest("hex")

        // Check if already rendered with same content
        const { data: existing } = await supabase
          .from("lecture_audio")
          .select("text_hash")
          .eq("lecture_id", lec.id)
          .eq("coach_id", coachId)
          .eq("beat_id", beatId)
          .maybeSingle()

        if (existing?.text_hash === hash) {
          totalSkipped++
          continue
        }

        const path = `${lec.id}/${coachId}/${beatId}.mp3`

        try {
          const audio = await withRetry(() =>
            tts(text, coach.voiceId, coach.settings)
          )

          await withRetry(async () => {
            const { error: upErr } = await supabase.storage
              .from(BUCKET)
              .upload(path, audio, { contentType: "audio/mpeg", upsert: true })
            if (upErr) throw upErr
          })

          await supabase.from("lecture_audio").upsert(
            {
              lecture_id: lec.id,
              coach_id: coachId,
              beat_id: beatId,
              storage_path: path,
              voice_id: coach.voiceId,
              model: EL_MODEL,
              char_count: text.length,
              text_hash: hash,
              generated_at: new Date().toISOString(),
            },
            { onConflict: "lecture_id,coach_id,beat_id" }
          )

          totalRendered++
          console.log(`✓ ${path} (${text.length} chars)`)
        } catch (e) {
          totalFailed++
          console.error(`✗ ${path} — ${(e as Error).message}`)
        }
      }
    }
  }

  console.log(`\n─── done ───`)
  console.log(`Rendered: ${totalRendered}`)
  console.log(`Skipped (unchanged): ${totalSkipped}`)
  console.log(`Failed: ${totalFailed}`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
