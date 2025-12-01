// scripts/generate-manifests.mjs
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const PACKS_ROOT = path.join(__dirname, "packs");
const PACKS_JSON_PATH = path.join(__dirname, "packs.json");

// simple helper
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// sehr simple Heuristik für Kategorien
function guessCategory(filename) {
  const name = filename.toLowerCase();
  if (name.includes("house") || name.includes("hut") || name.includes("inn") || name.includes("tower") || name.includes("castle")) {
    return "building";
  }
  if (name.includes("tree") || name.includes("rock") || name.includes("stone") || name.includes("bush")) {
    return "nature";
  }
  if (name.includes("barrel") || name.includes("crate") || name.includes("box") || name.includes("cart") || name.includes("bench")) {
    return "prop";
  }
  return "generic";
}

function generateManifests() {
  if (!fs.existsSync(PACKS_ROOT)) {
    console.error(`Ordner "packs" nicht gefunden: ${PACKS_ROOT}`);
    process.exit(1);
  }

  const packsDirs = fs
    .readdirSync(PACKS_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  /** @type {Array<{id:string,name:string,basePath:string}>} */
  const packsMeta = [];

  for (const dir of packsDirs) {
    const packId = slugify(dir); // z.B. "medieval-village"
    const packName = dir.replace(/[_-]/g, " "); // grob lesbarer Name
    const basePath = `packs/${dir}`;
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
    console.log(`✓ manifest.json erzeugt für Pack: ${dir}`);

    packsMeta.push({
      id: packId,
      name: packName,
      basePath,
    });
  }

  fs.writeFileSync(PACKS_JSON_PATH, JSON.stringify(packsMeta, null, 2), "utf-8");
  console.log(`✓ packs.json aktualisiert (${packsMeta.length} Packs)`);
}

generateManifests();
