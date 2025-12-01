// scripts/generate-manifests.mjs
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// >>> WICHTIG: Deine Struktur = game-assets/packs <<<
const PACKS_ROOT = path.join(__dirname, "game-assets", "packs");
const PACKS_JSON_PATH = path.join(__dirname, "game-assets", "packs.json");

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// sehr einfache Kategorie-Heuristik
function guessCategory(filename) {
  const name = filename.toLowerCase();
  if (
    name.includes("house") ||
    name.includes("hut") ||
    name.includes("inn") ||
    name.includes("tower") ||
    name.includes("castle")
  ) {
    return "building";
  }
  if (
    name.includes("tree") ||
    name.includes("rock") ||
    name.includes("stone") ||
    name.includes("bush")
  ) {
    return "nature";
  }
  if (
    name.includes("barrel") ||
    name.includes("crate") ||
    name.includes("box") ||
    name.includes("cart") ||
    name.includes("bench") ||
    name.includes("bag")
  ) {
    return "prop";
  }
  return "generic";
}

function generateManifests() {
  if (!fs.existsSync(PACKS_ROOT)) {
    console.error(`Ordner "game-assets/packs" nicht gefunden: ${PACKS_ROOT}`);
    process.exit(1);
  }

  const packsDirs = fs
    .readdirSync(PACKS_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  /** @type {Array<{id:string,name:string,basePath:string}>} */
  const packsMeta = [];

  for (const dir of packsDirs) {
    const packId = slugify(dir); // z.B. "medieval-village-pack-glb"
    const packName = dir.replace(/[_-]/g, " "); // grob lesbarer Name
