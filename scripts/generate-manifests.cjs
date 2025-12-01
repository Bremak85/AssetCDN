// scripts/generate-manifests.cjs
const fs = require("fs");
const path = require("path");

// Repo-Root ist das aktuelle Arbeitsverzeichnis
const ROOT = process.cwd();

// DEINE Struktur: AssetCDN/game-assets/packs
const PACKS_ROOT = path.join(ROOT, "game-assets", "packs");
const PACKS_JSON_PATH = path.join(ROOT, "game-assets", "packs.json");

function log(msg) {
  console.log(`[manifest-generator] ${msg}`);
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
    name.includes("bag") ||
    name.includes("door")
  ) {
    return "prop";
  }
  return "generic";
}

function generateManifests() {
  log(`ROOT: ${ROOT}`);
  log(`PACKS_ROOT: ${PACKS_ROOT}`);

  if (!fs.existsSync(PACKS_ROOT)) {
    console.error(`Ordner game-assets/packs nicht gefunden: ${PACKS_ROOT}`);
    process.exit(1);
  }

  const packDirs = fs
    .readdirSync(PACKS_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  log(`Gefundene Packs: ${packDirs.join(", ") || "(keine)"}`);

  const packsMeta = [];

  for (const dir of packDirs) {
    const packId = slugify(dir);
    const packName = dir.replace(/[_-]/g, " ");
    const basePath = `game-assets/packs/${dir}`;
    const packPath = path.join(PACKS_ROOT, dir);

    const files = fs
      .readdirSync(packPath, { withFileTypes: true })
      .filter(
        (f) =>
          f.isFile() &&
          (f.name.toLowerCase().endsWith(".glb") ||
            f.name.toLowerCase().endsWith(".gltf"))
      )
      .map((f) => f.name);

    log(`Pack "${dir}": ${files.length} Assets`);

    const manifest = files.map((file) => {
      const noExt = file.replace(/\.(glb|gltf)$/i, "");
      return {
        id: slugify(noExt),
        name: noExt,
        file,
        category: guessCategory(file),
      };
    });

    const manifestPath = path.join(packPath, "manifest.json");
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
    log(`manifest.json geschrieben: ${manifestPath}`);

    packsMeta.push({
      id: packId,
      name: packName,
      basePath,
    });
  }

  fs.writeFileSync(
    PACKS_JSON_PATH,
    JSON.stringify(packsMeta, null, 2),
    "utf-8"
  );
  log(`packs.json geschrieben: ${PACKS_JSON_PATH}`);
}

generateManifests();
