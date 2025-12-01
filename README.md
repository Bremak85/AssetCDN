# AssetCDN
Sammlung von Game Asset Packs

Gerne 👍
Hier ist eine **fertige, saubere README.md** für dein GitHub-Assets-Repo – genau zugeschnitten auf **Game-Assets als CDN + Admin-Integration in Gemini / Three.js**.
Du kannst sie **1:1 kopieren**.

---

````markdown
# 🎮 Game Assets Repository (Web-3D / Three.js / Gemini)

Dieses Repository dient als **zentrales Asset-CDN** für Web-Games (Three.js, Babylon.js, `<model-viewer>`, Gemini Apps Builder).

Ziel:
- 3D-Assets **einmal zentral ablegen**
- In beliebig vielen Projekten **direkt per URL laden**
- Einheitliche Struktur für **Admin-Pages, Asset-Browser & Dev-Tools im Game**

Assets werden über **jsDelivr (GitHub CDN)** ausgeliefert und müssen **nicht pro Projekt kopiert oder heruntergeladen** werden.

---

## ✅ Hauptkonzept

- Dieses Repo enthält **nur Assets + Metadaten**
- Spiele laden:
  - eine `packs.json` → verfügbare Asset-Packs
  - ein `manifest.json` pro Pack → Assets des Packs
- Jedes Game kann daraus dynamisch:
  - Asset-Listen bauen
  - In-Game-Admin-Panels anzeigen
  - Modelle direkt in die Szene spawnen

---

## 🌐 CDN-Basis-URL

Alle Assets sind öffentlich erreichbar über:

```text
https://cdn.jsdelivr.net/gh/<GITHUB_USER>/<REPO_NAME>@main/
````

Beispiel:

```text
https://cdn.jsdelivr.net/gh/markbreuer/game-assets@main/packs/medieval-village/FantasyHouse_01.glb
```

---

## 📁 Repository-Struktur

```text
game-assets/
│
├── packs.json
│
└── packs/
    ├── medieval-village/
    │   ├── manifest.json
    │   ├── FantasyHouse_01.glb
    │   ├── Blacksmith.glb
    │   ├── Barrel.glb
    │   └── ...
    │
    ├── lowpoly-nature/
    │   ├── manifest.json
    │   ├── Tree_01.glb
    │   ├── Rock_01.glb
    │   └── ...
    │
    └── ...
```

---

## 📦 packs.json (Liste aller Packs)

`packs.json` liegt im Root des Repos und beschreibt alle verfügbaren Asset-Pakete:

```json
[
  {
    "id": "medieval-village",
    "name": "Medieval Village Pack",
    "basePath": "packs/medieval-village"
  },
  {
    "id": "lowpoly-nature",
    "name": "Lowpoly Nature Pack",
    "basePath": "packs/lowpoly-nature"
  }
]
```

**Verwendung im Game:**

* Anzeige aller Packs in einer Admin-Page
* Auswahl eines Packs im Dev-UI
* Dynamisches Laden der Assets

---

## 📄 manifest.json (Assets eines Packs)

Jedes Pack enthält eine `manifest.json`, die alle enthaltenen Modelle beschreibt.

Beispiel:

```json
[
  {
    "id": "fantasy_house_01",
    "name": "Fantasy House 01",
    "file": "FantasyHouse_01.glb",
    "category": "building"
  },
  {
    "id": "blacksmith",
    "name": "Blacksmith",
    "file": "Blacksmith.glb",
    "category": "building"
  },
  {
    "id": "barrel",
    "name": "Barrel",
    "file": "Barrel.glb",
    "category": "prop"
  }
]
```

### Felder

| Feld       | Beschreibung                                   |
| ---------- | ---------------------------------------------- |
| `id`       | Stabile Asset-ID (für Code & Speicherung)      |
| `name`     | Anzeigename im UI                              |
| `file`     | Dateiname im Pack-Ordner                       |
| `category` | Optional (z. B. building, prop, decor, nature) |

---

## 🎯 Verwendet in Projekten

Typischer Ablauf in einem Game:

1. `packs.json` laden → Pack auswählen
2. `manifest.json` laden → Asset-Liste darstellen
3. Asset per URL laden:

```ts
const url =
  "https://cdn.jsdelivr.net/gh/<USER>/<REPO>@main/" +
  pack.basePath + "/" +
  asset.file;
```

4. Laden mit `GLTFLoader` / `Three.js`
5. Asset in die Szene spawnen (Dev-Admin oder Gameplay)

---

## 🛠️ Assets zu einem neuen Pack hinzufügen

1. Neuen Ordner unter `packs/` anlegen
2. `.glb`-Dateien hineinkopieren
3. `manifest.json` anlegen oder aktualisieren
4. Pack zu `packs.json` hinzufügen
5. Commit & Push

➡️ **Alle Games können das Pack sofort nutzen – kein weiterer Code nötig**

---

## 🔒 Lizenzen & Hinweis

* Dieses Repo enthält **nur Assets, deren Lizenz eine Weiterverwendung zulässt**
* Ursprungsquellen (z. B. Poly Pizza) müssen ggf. genannt werden
* Lizenzinfos können optional ergänzt werden:

  * als Feld im `manifest.json`
  * oder als `LICENSE.txt` im Pack-Ordner

---

## 🚀 Ziel dieses Repos

✅ Einmal pflegen
✅ Überall nutzen
✅ Keine Asset-Duplikate
✅ Perfekt für:

* Prototyping
* Level-Editoren
* In-Game-Admin-Tools
* Gemini Apps Builder Workflows

---

## ✅ Empfohlenes Setup (Best Practice)

* Dieses Repo **niemals mit App-Code vermischen**
* Ein Repo = Assets & Metadaten
* Spiele greifen **nur lesend** auf dieses Repo zu
* Änderungen am Pack → automatisch in allen Projekten verfügbar

---

## 📌 Maintainer Notes

* Struktur bitte **nicht ohne Absprache ändern**
* Neue Felder im manifest sind erlaubt (z. B. scale, defaultRotation)
* ID-Stabilität ist wichtig (id ≠ Dateiname ändern)

---

Happy prototyping 🎮✨

```

---

Sag einfach, wie tief wir automatisieren sollen.
```
