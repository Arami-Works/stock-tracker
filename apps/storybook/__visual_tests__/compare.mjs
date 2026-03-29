#!/usr/bin/env node

/**
 * Visual regression test: Storybook ↔ Figma pixel comparison
 *
 * Usage:
 *   node compare.mjs <storybook-story-id> <figma-baseline.png>
 *
 * Requires Storybook running on localhost:6006
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SCREENSHOTS_DIR = join(__dirname, "screenshots");
const DIFFS_DIR = join(__dirname, "diffs");
const BASELINES_DIR = join(__dirname, "baselines");

// Ensure directories exist
[SCREENSHOTS_DIR, DIFFS_DIR].forEach((dir) => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

const storyId = process.argv[2];
const baselinePath = process.argv[3];

if (!storyId || !baselinePath) {
  console.error(
    "Usage: node compare.mjs <storybook-story-id> <figma-baseline.png>",
  );
  process.exit(1);
}

const screenshotPath = join(SCREENSHOTS_DIR, `${storyId}.png`);
const diffPath = join(DIFFS_DIR, `${storyId}-diff.png`);

// 1. Capture Storybook screenshot
console.log(`📸 Capturing Storybook story: ${storyId}`);
const storybookUrl = `http://localhost:6006/iframe.html?id=${storyId}&viewMode=story`;

execSync(
  `playwright screenshot --browser chromium "${storybookUrl}" "${screenshotPath}" --wait-for-timeout 3000`,
  { stdio: "inherit" },
);

// 2. Load both images
console.log(`🔍 Comparing against baseline: ${baselinePath}`);
const actual = PNG.sync.read(readFileSync(screenshotPath));
const expected = PNG.sync.read(readFileSync(baselinePath));

// 3. Use baseline (Figma) dimensions as the canonical size
const width = expected.width;
const height = expected.height;
console.log(`   Baseline: ${expected.width}×${expected.height}, Screenshot: ${actual.width}×${actual.height}`);

// Crop both to same size (top-left aligned)
function cropPNG(png, w, h) {
  const cropped = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcIdx = (y * png.width + x) * 4;
      const dstIdx = (y * w + x) * 4;
      cropped.data[dstIdx] = png.data[srcIdx];
      cropped.data[dstIdx + 1] = png.data[srcIdx + 1];
      cropped.data[dstIdx + 2] = png.data[srcIdx + 2];
      cropped.data[dstIdx + 3] = png.data[srcIdx + 3];
    }
  }
  return cropped;
}

const croppedActual = cropPNG(actual, width, height);
const croppedExpected = cropPNG(expected, width, height);

// 4. Compare
const diff = new PNG({ width, height });
const numDiffPixels = pixelmatch(
  croppedActual.data,
  croppedExpected.data,
  diff.data,
  width,
  height,
  { threshold: 0.1 },
);

// 5. Save diff
writeFileSync(diffPath, PNG.sync.write(diff));

// 6. Report
const totalPixels = width * height;
const diffPercent = ((numDiffPixels / totalPixels) * 100).toFixed(2);

console.log(`\n${"─".repeat(50)}`);
console.log(`📊 Results:`);
console.log(`   Image size: ${width}×${height}`);
console.log(`   Different pixels: ${numDiffPixels.toLocaleString()} / ${totalPixels.toLocaleString()}`);
console.log(`   Diff: ${diffPercent}%`);
console.log(`   Diff image: ${diffPath}`);

if (numDiffPixels === 0) {
  console.log(`\n✅ PERFECT MATCH — zero pixel difference`);
} else if (parseFloat(diffPercent) < 1) {
  console.log(`\n🟡 CLOSE MATCH — ${diffPercent}% difference (< 1% threshold)`);
} else {
  console.log(`\n❌ MISMATCH — ${diffPercent}% difference`);
  process.exit(1);
}
