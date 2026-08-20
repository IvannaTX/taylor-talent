/**
 * Enforces the imagery rules that a diff will not show you.
 *
 *   node scripts/audit-imagery.ts
 *
 * Checks, in order of how quietly each one breaks:
 *
 *   1. No photograph serves two slots. This is the one that actually went wrong
 *      here: four client backdrops pointed at the executive-network portraits, so
 *      one stock stranger appeared behind two companies and a role archetype on a
 *      single page. Nothing in a code review catches that.
 *   2. Every slot's asset exists on disk.
 *   3. Every asset in use has a provenance record.
 *   4. Every file under public/images is claimed by a slot — otherwise deleted
 *      surfaces leave photographs of people lying in the deploy.
 *   5. The data files agree with the inventory, so the inventory cannot quietly
 *      go stale.
 */

import { readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { imageSlots, provenance } from "../data/imagery.ts";
import { executiveProfiles } from "../data/executiveNetwork.ts";
import { searchStories } from "../data/searchStories.ts";
import { clients } from "../data/clients.ts";
import { companies } from "../data/companies.ts";
import { clientBackdrops } from "../lib/backdrops.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(HERE, "..", "public");
const IMAGES = join(PUBLIC, "images");

const problems: string[] = [];
/* Reported, not failed: most of these marks predate the registry. */
const marksWithoutProvenance: string[] = [];
const fail = (msg: string) => problems.push(msg);

/* 1 — no asset in two slots ------------------------------------------- */

const byAsset = new Map<string, string[]>();
for (const slot of imageSlots) {
  if (!slot.asset) continue;
  byAsset.set(slot.asset, [...(byAsset.get(slot.asset) ?? []), slot.id]);
}
for (const [asset, slots] of byAsset) {
  if (slots.length > 1) {
    fail(`reused asset: ${asset} fills ${slots.length} slots — ${slots.join(", ")}`);
  }
}

/* 2 — assets exist ----------------------------------------------------- */

for (const [asset] of byAsset) {
  try {
    await stat(join(PUBLIC, asset));
  } catch {
    fail(`missing file: ${asset} (slot expects it on disk)`);
  }
}

/* 3 — assets have provenance ------------------------------------------ */

for (const [asset] of byAsset) {
  if (!provenance[asset]) fail(`no provenance record: ${asset}`);
}

/* 4 — no orphaned files ------------------------------------------------ */

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

for (const file of await walk(IMAGES)) {
  const asset = `/${relative(PUBLIC, file).split("\\").join("/")}`;
  if (!byAsset.has(asset)) {
    fail(`orphan: ${asset} is on disk but no slot claims it`);
  }
}

/* 5 — inventory matches the data files -------------------------------- */

for (const profile of executiveProfiles) {
  const slot = imageSlots.find((s) => s.id === `exec-network-${profile.id}`);
  if (!slot) {
    fail(`inventory gap: profile "${profile.id}" has no slot`);
    continue;
  }
  const actual = profile.image?.src ?? null;
  if (actual !== slot.asset) {
    fail(`inventory drift: profile "${profile.id}" uses ${actual ?? "null"}, slot says ${slot.asset ?? "null"}`);
  }
}

for (const story of searchStories) {
  const { visual } = story;
  if (visual.type !== "image") continue;
  const claimed = imageSlots.some((slot) => slot.asset === visual.src);
  if (!claimed) fail(`inventory gap: search story "${story.id}" uses unlisted ${visual.src}`);
}

/* The client showcase must stay free of photography. */
for (const [name, record] of Object.entries(clients)) {
  if (!record.backdrop) continue;
  const spec = clientBackdrops[record.backdrop];
  if (!spec) {
    fail(`unknown backdrop: ${name} references "${record.backdrop}"`);
    continue;
  }
  const slot = imageSlots.find((s) => s.asset === spec.plate);
  if (!slot) fail(`inventory gap: backdrop plate ${spec.plate} (${name}) is not listed`);
  else if (slot.photographic) fail(`client showcase must not be photographic: ${name} -> ${spec.plate}`);
}

const backdropUsage = new Map<string, string[]>();
for (const [name, record] of Object.entries(clients)) {
  if (!record.backdrop) continue;
  backdropUsage.set(record.backdrop, [...(backdropUsage.get(record.backdrop) ?? []), name]);
}
for (const [id, names] of backdropUsage) {
  if (names.length > 1) fail(`shared backdrop: "${id}" fronts ${names.join(", ")}`);
}

/* 6 — company marks --------------------------------------------------- */

/* Not image *slots*, but the same failure mode: a logo silently falling back to
   set type because the file is missing reads as a design choice rather than a
   gap. A mark is either present and on disk, or explicitly `wordmark`. */
for (const company of companies) {
  if (!company.logo) {
    if (!company.wordmark) fail(`company "${company.name}" has no logo and is not marked wordmark`);
    continue;
  }
  try {
    await stat(join(PUBLIC, company.logo));
  } catch {
    fail(`missing logo file: ${company.logo} (${company.name})`);
  }
  if (company.logo.endsWith(".svg") && !provenance[company.logo]) {
    marksWithoutProvenance.push(`${company.name} (${company.logo})`);
  }
}

/* ---- report ---------------------------------------------------------- */

const photographic = imageSlots.filter((s) => s.photographic);
const pending = photographic.filter((s) => !s.asset);
const unknownOrigin = [...byAsset.keys()].filter((a) => provenance[a]?.kind === "unknown");

console.log(`  slots            ${imageSlots.length} (${photographic.length} photographic, ${imageSlots.length - photographic.length} generated)`);
console.log(`  assets in use    ${byAsset.size}, each in exactly one slot`);
console.log(`  briefed, pending ${pending.length}${pending.length ? ` — ${pending.map((s) => s.id).join(", ")}` : ""}`);
/* `wordmark` wins in the component regardless of whether a file exists — GLG
   ships a PNG and still renders as type — so count by what actually paints. */
const masked = companies.filter((c) => c.logo && !c.wordmark);
const typeset = companies.filter((c) => c.wordmark);
console.log(`  company marks    ${masked.length} masked artwork, ${typeset.length} set in type, ${marksWithoutProvenance.length} without provenance`);
console.log(`  unknown origin   ${unknownOrigin.length}${unknownOrigin.length ? ` — flagged in data/imagery.ts` : ""}`);

if (problems.length) {
  console.error(`\n  ${problems.length} problem(s):`);
  for (const p of problems) console.error(`    ${p}`);
  process.exit(1);
}
console.log("  imagery audit clean.\n");
