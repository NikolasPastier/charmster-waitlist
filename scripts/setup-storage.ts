/**
 * setup-storage.ts
 *
 * One-time setup:
 *   1. Creates the `lecture-audio` storage bucket (public: false)
 *   2. Applies the lecture_audio table migration
 *   3. Prints a summary of what's ready
 *
 * Run: npm run setup   (from scripts/)
 */

import { createClient } from "@supabase/supabase-js"
import * as fs from "node:fs"
import * as path from "node:path"
import * as dotenv from "dotenv"

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function run() {
  console.log("── Charmster TTS Pipeline Setup ──\n")

  // 1. Create lecture-audio bucket
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some((b) => b.name === "lecture-audio")

  if (exists) {
    console.log("✓ lecture-audio bucket already exists")
  } else {
    const { error } = await supabase.storage.createBucket("lecture-audio", {
      public: false,
      fileSizeLimit: 10 * 1024 * 1024, // 10 MB per file
      allowedMimeTypes: ["audio/mpeg"],
    })
    if (error) {
      console.error("✗ Failed to create bucket:", error.message)
    } else {
      console.log("✓ lecture-audio bucket created")
    }
  }

  // 2. Apply the SQL migration
  const migrationPath = path.join(
    __dirname,
    "../supabase/migrations/0002_lecture_audio.sql"
  )
  const sql = fs.readFileSync(migrationPath, "utf8")

  const { error: sqlErr } = await supabase.rpc("exec_sql", { sql })
  if (sqlErr) {
    // exec_sql may not exist; print instructions instead
    console.log("\n⚠️  Could not auto-apply migration (exec_sql RPC not available).")
    console.log("   Run this in Supabase SQL editor:")
    console.log("   Dashboard → SQL Editor → New query → paste & run:\n")
    console.log(sql)
  } else {
    console.log("✓ lecture_audio table migration applied")
  }

  // 3. Check lecture count + coach_scripts status
  const { data: stats } = await supabase
    .from("lectures")
    .select("id, format, coach_scripts")

  const total = stats?.length ?? 0
  const assessments = stats?.filter((l) => l.format === "assessment").length ?? 0
  const withScripts = stats?.filter(
    (l) =>
      l.coach_scripts &&
      typeof l.coach_scripts === "object" &&
      "theo" in l.coach_scripts
  ).length ?? 0

  console.log("\n── Lecture status ──")
  console.log(`Total lectures in DB:          ${total}`)
  console.log(`Assessments (skip TTS):        ${assessments}`)
  console.log(`Ready for TTS (have 5 scripts): ${withScripts}`)
  console.log(`Need script expansion:          ${total - assessments - withScripts}`)

  console.log("\n── Next steps ──")
  if (withScripts < total - assessments) {
    console.log("1. Run:  npm run generate-scripts")
    console.log("   (expands all lectures to structured 5-beat coach scripts)\n")
    console.log("2. Add voice IDs to .env, then:")
    console.log("   npm run generate-audio")
  } else {
    console.log("1. Add voice IDs to .env, then:")
    console.log("   npm run generate-audio")
  }
  console.log("\nVoice IDs: clone voices at elevenlabs.io/app/voice-lab")
  console.log("Upload the MP3s from: /Charmster ai avatars/coach voices/")
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
