/**
 * generate-coach-scripts.ts
 *
 * Reads every lecture's raw_markdown, calls Claude to expand it into
 * structured 5-beat narration for all 5 coaches, and writes the result
 * back to the coach_scripts column in Supabase.
 *
 * Idempotent: skips any lecture already fully populated.
 * Skip assessments: they have no teaching script to narrate.
 *
 * Run: npm run generate-scripts   (from scripts/)
 */

import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@supabase/supabase-js"
import * as dotenv from "dotenv"

dotenv.config()

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const MODEL = "claude-sonnet-4-6"
const REQUIRED_COACHES = ["theo", "dr_ray", "cole", "noah", "leo"]

const SYSTEM = `You are adapting ONE Charmster lecture into structured per-coach narration for a dating-skills mobile app.

COACH PERSONAS:
- theo      "The Big Brother":   warm, casual, been-there. Plain talk, zero judgment, "here's what actually works."
- dr_ray    "The Scientist":     curious, articulate, evidence-based. Explains the WHY/mechanism; fascinating, never dry.
- cole      "The Alpha Mentor":  direct, grounded, high-conviction. Short punchy challenges; believes in you, never aggressive.
- noah      "The Therapist":     calm, gentle, emotionally intelligent. Slows you down, reflective questions, safe space.
- leo       "The Wingman":       playful, high-energy hype. Turns the skill into a fun mission; light and motivating.

TASK:
For EACH of the 5 coaches, write the 5-beat narration in that coach's voice.
The taught skill, examples' substance, and success criteria stay IDENTICAL — only tone, hook framing, and phrasing change.
Write to be SPOKEN (audio-first): short sentences, natural rhythm, no on-screen-only references.

LENGTH PER BEAT:
- hook:            ~2 sentences
- coreInsight:     3–4 sentences
- goodVsBad:       3–4 sentences describing the good vs bad examples
- recall:          1-line question + 2–3 answer options + the correct index (0-based) + 1-line why
- takeawayHandoff: ~2 sentences ending with an energising push into practice

OUTPUT: JSON only — no prose, no code fences. Exact shape:
{
  "theo":   { "hook": "...", "coreInsight": "...", "goodVsBad": "...", "recall": { "question": "...", "options": ["...", "..."], "correct": 0, "why": "..." }, "takeawayHandoff": "..." },
  "dr_ray": { ... },
  "cole":   { ... },
  "noah":   { ... },
  "leo":    { ... }
}`

function userPrompt(lec: { title: string; raw_markdown: string }): string {
  return [
    `LECTURE TITLE: ${lec.title}`,
    `LECTURE CONTENT (markdown — contains teaching scripts, good/bad examples, quiz, and practice scenario):`,
    lec.raw_markdown,
    `Return JSON only for all 5 coaches: theo, dr_ray, cole, noah, leo.`,
  ].join("\n\n")
}

function extractJson(s: string): Record<string, unknown> {
  const start = s.indexOf("{")
  const end = s.lastIndexOf("}")
  if (start === -1 || end === -1) throw new Error("No JSON object found in response")
  return JSON.parse(s.slice(start, end + 1))
}

function isComplete(scripts: Record<string, unknown> | null): boolean {
  if (!scripts) return false
  return REQUIRED_COACHES.every((c) => {
    const coach = scripts[c] as Record<string, unknown> | undefined
    return (
      coach &&
      typeof coach.hook === "string" &&
      typeof coach.coreInsight === "string" &&
      typeof coach.goodVsBad === "string" &&
      coach.recall !== undefined &&
      typeof coach.takeawayHandoff === "string"
    )
  })
}

async function withRetry<T>(fn: () => Promise<T>, tries = 3): Promise<T> {
  let last: unknown
  for (let i = 0; i < tries; i++) {
    try {
      return await fn()
    } catch (e) {
      last = e
      const delay = 2000 * 2 ** i
      console.warn(`  retry ${i + 1}/${tries} in ${delay}ms — ${(e as Error).message}`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw last
}

async function run() {
  const { data: lectures, error } = await supabase
    .from("lectures")
    .select("id, title, format, raw_markdown, coach_scripts")
    .order("id")

  if (error) throw error
  if (!lectures?.length) throw new Error("No lectures returned from Supabase")

  const eligible = lectures.filter(
    (l) => l.format !== "assessment" && l.raw_markdown
  )

  console.log(`Total lectures: ${lectures.length}`)
  console.log(`Eligible (non-assessment, has raw_markdown): ${eligible.length}`)

  let skipped = 0
  let processed = 0
  let failed = 0

  for (const lec of eligible) {
    if (isComplete(lec.coach_scripts)) {
      skipped++
      continue
    }

    console.log(`\n→ ${lec.id} — ${lec.title}`)

    try {
      const msg = await withRetry(() =>
        anthropic.messages.create({
          model: MODEL,
          max_tokens: 8000,
          system: SYSTEM,
          messages: [{ role: "user", content: userPrompt(lec) }],
        })
      )

      const raw = msg.content
        .filter((c) => c.type === "text")
        .map((c: { type: "text"; text: string }) => c.text)
        .join("")

      const json = extractJson(raw)

      const missing = REQUIRED_COACHES.filter((c) => !json[c])
      if (missing.length) {
        console.warn(`  ✗ missing coaches: ${missing.join(", ")} — skipping write`)
        failed++
        continue
      }

      const { error: upErr } = await supabase
        .from("lectures")
        .update({ coach_scripts: json })
        .eq("id", lec.id)

      if (upErr) throw upErr

      processed++
      console.log(`  ✓ 5 coach scripts written`)
    } catch (e) {
      console.error(`  ✗ failed: ${(e as Error).message}`)
      failed++
    }
  }

  console.log(`\n─── done ───`)
  console.log(`Skipped (already complete): ${skipped}`)
  console.log(`Processed: ${processed}`)
  console.log(`Failed: ${failed}`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
