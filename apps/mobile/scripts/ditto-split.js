#!/usr/bin/env node

/**
 * ditto-split.js
 *
 * Reads the flat JSON exported by the Ditto CLI and splits it into
 * i18next-compatible namespace files using the mapping in ditto-id-map.json.
 *
 * Ditto Developer IDs follow Figma frame naming (e.g., tracker-dashboard-home-saCard.statusEligible).
 * This script maps them to the existing i18next nested key structure (e.g., tracker → dashboard.saCard.statusEligible).
 *
 * Usage: node scripts/ditto-split.js
 *        (run from apps/mobile/ after ditto-cli pull)
 */

const fs = require("fs");
const path = require("path");

const DITTO_DIR = path.join(__dirname, "..", "ditto");
const I18N_DIR = path.join(__dirname, "..", "src", "lib", "i18n");
const ID_MAP_PATH = path.join(__dirname, "ditto-id-map.json");

const idMap = JSON.parse(fs.readFileSync(ID_MAP_PATH, "utf-8"));

// Find all Ditto export files matching {project}___{variant}.json
const dittoFiles = fs
  .readdirSync(DITTO_DIR)
  .filter((f) => f.endsWith(".json") && f.includes("___"));

if (dittoFiles.length === 0) {
  console.error("No Ditto export files found in", DITTO_DIR);
  process.exit(1);
}

for (const file of dittoFiles) {
  // Parse variant from filename: stock-tracker___base.json → "base" (mapped to "ko")
  // Future: stock-tracker___en.json → "en"
  const match = file.match(/^.+___(.+)\.json$/);
  if (!match) continue;

  const variant = match[1];
  // Map Ditto variant names to i18next locale codes
  const locale = variant === "base" ? "ko" : variant;

  const flatJson = JSON.parse(
    fs.readFileSync(path.join(DITTO_DIR, file), "utf-8")
  );

  // Group by namespace using the ID map
  const namespaces = {};
  const unmapped = [];

  for (const [dittoId, text] of Object.entries(flatJson)) {
    const mapping = idMap[dittoId];
    if (!mapping) {
      unmapped.push(dittoId);
      continue;
    }

    const { ns, key } = mapping;
    if (!namespaces[ns]) namespaces[ns] = {};

    // Build nested object from dot-separated key
    const parts = key.split(".");
    let current = namespaces[ns];
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = text;
  }

  if (unmapped.length > 0) {
    console.warn(
      `Warning: ${unmapped.length} unmapped Developer IDs for variant "${variant}":`
    );
    for (const id of unmapped) {
      console.warn(`  - ${id}`);
    }
  }

  // Write namespace files
  const localeDir = path.join(I18N_DIR, locale);
  fs.mkdirSync(localeDir, { recursive: true });

  for (const [ns, data] of Object.entries(namespaces)) {
    const outPath = path.join(localeDir, `${ns}.json`);
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
    console.log(`  ${locale}/${ns}.json (${Object.keys(data).length} keys)`);
  }
}

console.log("Done.");
