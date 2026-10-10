# AGENTS.md — Ardhas Invitations AI System Reference

> **Target Audience:** Autonomous AI coding agents, LLM inference tools (Gemini, Claude, GPT, Cursor, Copilot, Antigravity, Aider, Windsurf), and human engineers.  
> **Repository:** `ardhas-invitations`  
> **Status:** Active, Single Page Application (React 19 + Vite 7 + Tailwind CSS v4)  
> **Last Updated:** October 2026  

---

## 1. Executive Summary & Core Identity

**Ardhas** (`ardhas-invitations`) is a luxury, mobile-first digital invitation platform and live design studio built for weddings, ceremonies, and milestone celebrations in India (headquartered in Kerala).

### Core Operational Model
- **Client-Side SPA Architecture:** 100% frontend React application. **Zero backend**, zero database, zero authentication, and zero personal-data server transmissions.
- **Service-Led Operations:** The founder crafts invitations for clients. The live web application serves both as an interactive portfolio/demo and as an internal production tool where client briefs, structured JSON configurations, media checklists, and print-ready PDFs are generated.
- **Draft Isolation:** Supports 16 distinct celebration types with 80 total design variations (5 dedicated layouts per celebration). Switching between events in the studio preserves independent draft states in memory without cross-contamination.

---

## 2. Technical Stack & Dependencies

| Layer | Technology | Version | Purpose / Invariants |
| :--- | :--- | :--- | :--- |
| **Runtime & Core** | React | `^19.2.0` | UI rendering. *Note: StrictMode is intentionally omitted in root to prevent legacy lifecycle diagnostics from React Helmet 6.* |
| **Bundler & Dev Server**| Vite | `^7.3.1` | Instant HMR, ESM bundling, static build outputting to `/dist`. |
| **Styling** | Tailwind CSS v4 | `^4.2.0` | Styled via `@import "tailwindcss";` and `@theme` in `src/styles/global.css`. Component-specific CSS sheets in `src/styles/`. |
| **Routing** | React Router DOM | `^7.13.0` | Client-side routing with hash-based section scroll restoration. |
| **Motion & Physics** | Framer Motion & GSAP | `framer-motion: ^12.34.0`, `gsap: ^3.14.0` | Framer Motion for UI micro-interactions; GSAP for complex door reveals and scroll timelines (`/housewarming`). |
| **Media Handling** | Universal Media Engine | Custom (`src/utils/media.js`) | YouTube embed/ID parsing, thumbnail extraction (`img.youtube.com`), MP4 video detection, Base64 stripping. |
| **Client Export** | jsPDF & html-to-image | `jspdf: ^4.2.1`, `html-to-image: ^1.11.13` | Multi-page client specification PDF generator and DOM-to-PNG renderer. |
| **Iconography** | Lucide React | `^0.577.0` | Consistent luxury editorial icon set. |
| **Testing** | Node Native Test Runner | Node 22+/24+ `node:test` | Zero external test runners. Fast unit and jsdom DOM integration tests (`npm test`). |

---

## 3. Non-Negotiable System Invariants & AI Guardrails

When modifying, generating, or refactoring code in this repository, **all AI agents must strictly uphold the following invariants**:

1. **Zero Server Assumption:**
   - Never introduce `fetch()`, `axios`, API routes, or database calls for state management, guest RSVP, or form storage.
   - All persistence is in-memory React state (`InvitationContext`). Refreshing resets to curated defaults.
2. **Strict Test Invariants (`npm test`):**
   - The test suite (`npm test`) runs 24 automated tests across 4 test suites:
     - `src/context/invitationState.test.js`
     - `src/pages/Housewarming.test.js`
     - `src/utils/clientExport.test.js`
     - `src/utils/media.test.js`
   - Invariant: `eventTypes.length === 16`
   - Invariant: `templates.length === 80` (16 occasions × 5 templates each)
   - Invariant: `new Set(templates.map(t => t.id)).size === 80`
   - Invariant: Each occasion must feature 5 distinct layouts (`new Set(designs.map(d => d.layout)).size === 5`).
3. **No StrictMode at Application Root:**
   - In `src/main.jsx`, `ReactDOM.createRoot` renders `<App />` directly inside `<InvitationProvider>`. Do **NOT** wrap `<App />` in `<React.StrictMode>`. `react-helmet` 6.1.0 uses legacy React internals that produce noisy console warnings under React 19 StrictMode.
4. **Media Slot Sanitization & No Base64 in JSON:**
   - In `src/utils/clientExport.js`, the exported `client-details.json` must **never** contain Base64 data strings or video blobs. Local files must be mapped to expected filenames (`<project-id>_<SLOT_ID>.<ext>`) and remote URLs preserved as strings.
5. **Universal YouTube Video Support:**
   - Any image/video slot accepts standard image URLs, uploaded images, and YouTube URLs (`watch`, `youtu.be`, `embed`, `shorts`). Components must use `parseYouTubeUrl()` and render YouTube responsive iframes whenever `isYouTube` is detected.
6. **Project ID Regex Enforcement:**
   - All client projects must strictly adhere to `^[a-z0-9-]{3,40}$` (lowercase letters, digits, and hyphens; 3–40 characters; no spaces or uppercase).

---

## 4. Repository Directory Map

```
ardhas-invitations/
├── docs/
│   ├── client-details.schema.json  # JSON Schema (Draft 2020-12) for exported client handoff files
│   └── AI_ARCHITECTURE.md          # Deep architectural graphs, state machines, and data flow
├── public/
│   ├── 404.html                    # GitHub Pages SPA redirect fallback for /preview & /customizer
│   ├── favicon.svg                 # Brand monogram SVG
│   ├── housewarming-home.jpg       # Optimized (~450KB) hero concept art for housewarming
│   └── robots.txt                  # Standard crawler directives
├── src/
│   ├── assets/
│   │   └── botanical.svg           # Luxury brand illustration asset
│   ├── components/
│   │   ├── ArdhasOrderSheet.jsx    # Internal production order sheet rendered on preview/print
│   │   ├── BookingDialog.jsx       # WhatsApp & Instagram inquiry booking modal
│   │   ├── ClientHandoffPanel.jsx  # Export drawer with collapsible menu button (PDF, JSON, checklist, ZIP)
│   │   ├── Navbar.jsx              # Global brand header navigation
│   │   ├── Reveal.jsx              # Framer Motion scroll entrance wrapper
│   │   ├── discovery/              # Discovery & template showcase components
│   │   │   ├── FilterBar.jsx       # Occasion and style filter tags
│   │   │   ├── ShortlistDrawer.jsx # Client favorite shortlist drawer
│   │   │   └── TemplateQuickViewModal.jsx # Quick view modal for template discovery
│   │   ├── housewarming/           # Dedicated Kerala housewarming components
│   │   │   ├── BlurText.jsx        # Animated text reveal with React Bits license
│   │   │   ├── CelebrationMark.jsx # Brass lamp & blessing emblem
│   │   │   └── HousewarmingGames.jsx # Interactive 3x3 puzzle, lamp lighting, decor canvas
│   │   └── preview/                # Full invitation preview enhancements
│   │       ├── EnvelopeOpening.jsx # Interactive wax seal envelope animation
│   │       └── TemplateSwitcherDock.jsx # Floating bottom switcher dock
│   ├── context/
│   │   ├── InvitationContext.jsx   # Global React context provider & useInvitation hook
│   │   ├── invitationState.js      # Pure reducer: actions ('event', 'template', 'update', 'reset')
│   │   └── invitationState.test.js # State regressions & invariant assertions (Node test runner)
│   ├── data/
│   │   ├── content.js              # Curated copy defaults, blessings, poetry, and presets
│   │   ├── events.js               # Occasion catalog (16 celebrations), 80 template definitions
│   │   ├── housewarming.js         # Dedicated data for Vazhappalli Thekkathil housewarming
│   │   └── mediaSlots.js           # Media slot registry, project ID & custom field validators
│   ├── hooks/
│   │   ├── useHeroMotion.js        # GSAP hero animation lifecycle
│   │   └── useInvitationBell.js    # Audio synthesis / bell chime Web Audio API hook
│   ├── pages/
│   │   ├── Customizer.jsx          # Live design studio with split controls & real-time preview
│   │   ├── Home.jsx                # Portfolio showcase, collection gallery, and booking CTA
│   │   ├── Housewarming.jsx        # Dedicated traditional-modern Kerala housewarming experience
│   │   ├── Housewarming.test.js    # JSDOM integration tests for housewarming
│   │   └── Preview.jsx             # Standalone full-screen mobile/desktop invitation preview
│   ├── sections/
│   │   └── InvitationSections.jsx  # Modular invitation sections (Hero, Couple, Schedule, Venue, RSVP, etc.)
│   ├── styles/
│   │   ├── customizer.css          # Studio layout, control groups, collapsible handoff menu
│   │   ├── discovery.css           # Template discovery grid, search, filters
│   │   ├── event-invitations.css   # Occasion-specific styling overrides
│   │   ├── global.css              # Tailwind v4 import, @theme directives, luxury typography variables
│   │   ├── housewarming.css        # Traditional Kerala architectural theme styles
│   │   ├── housewarming-games.css  # Puzzle & interactive mini-games styling
│   │   ├── invitation.css          # Base invitation layouts, paper textures, gold foil gradients
│   │   ├── minimalism-purple.css   # ChungDoi-inspired lilac template styles
│   │   └── pinterest-templates.css # Mobile editorial stationery styles (deckle, velure, estate, polaroid)
│   ├── templates/                  # Template component implementations
│   │   ├── BohoTerracotta.jsx      # Earthy boho terracotta aesthetic
│   │   ├── CelestialMidnight.jsx   # Starry dark midnight blue aesthetic
│   │   ├── ClassicTraditional.jsx  # Traditional Indian heritage aesthetic
│   │   ├── Contemporary.jsx        # Modern clean editorial layout
│   │   ├── CustomTheme.jsx         # Highly personalized user theme
│   │   ├── DeckleRomance.jsx       # Torn deckle paper, romantic script, gold foil
│   │   ├── EstateStory.jsx         # Architectural columns, serif typography
│   │   ├── FloralElegant.jsx       # Soft botanical floral motifs
│   │   ├── GlassmorphicNoir.jsx    # Translucent glassmorphism over dark gradients
│   │   ├── HeritageVelvet.jsx      # Royal darbar velvet & gold brocade
│   │   ├── Invitation.jsx          # Master dispatcher component & toolbar
│   │   ├── MinimalismPurple.jsx    # ChungDoi-inspired lavender wax seal, pocket photo, mini calendar
│   │   ├── MinimalLuxury.jsx       # Quiet luxury, generous white space
│   │   ├── ModernRomantic.jsx      # Warm pastel contemporary romance
│   │   ├── PolaroidStory.jsx       # Overlapping polaroids & washi tape layout
│   │   ├── RoyalPremium.jsx        # Ornate palace borders & royal motifs
│   │   ├── VelureMinimal.jsx       # Woven linen texture & muted olive/stone palette
│   │   └── Welcome.jsx             # Splash entrance screens (wax seal, envelope, ribbon)
│   ├── utils/
│   │   ├── clientExport.js         # jsPDF builder, JSON exporter, ZIP bundler
│   │   ├── clientExport.test.js    # Export validation unit tests
│   │   ├── media.js                # YouTube parser, thumbnail resolver, video detector
│   │   └── media.test.js           # Media engine unit tests
│   ├── App.jsx                     # Root router, hash scroll restoration, lazy routes
│   └── main.jsx                    # Vite app entry point
├── AGENTS.md                       # (This file) Core AI operational reference
├── ARDHAS_MASTER_PLAN.md           # Business master plan and operational guide (115KB)
├── llms.txt                        # Standard LLM discovery index (llmstxt.org)
├── llms-full.txt                   # Complete expanded LLM system document
├── package.json                    # Scripts and dependencies
└── vite.config.js                  # Vite configuration with Tailwind CSS plugin
```

---

## 5. State Machine & Data Flow

### The Reducer Architecture (`src/context/invitationState.js`)
State management is handled by a pure, synchronous reducer with no async middleware.

```javascript
// State Shape
{
  activeEvent: "Wedding",       // Key of active event type (one of 16 eventTypes)
  drafts: {
    Wedding: { ...defaultConfig },
    Engagement: { ...defaultConfig },
    // Each event retains its independent configuration and draft edits
  }
}
```

### Action Types

| Action | Payload | Effect |
| :--- | :--- | :--- |
| `type: "event"` | `{ eventType: string }` | Switches `activeEvent`. If draft does not exist for `eventType`, instantiates defaults from `getEventDefaults(eventType)`. Preserves existing draft. |
| `type: "template"` | `{ id: string }` | Looks up template in `templates`. Updates the draft's `template`, `style`, `layout`, `color`, `font`, and `background`. Automatically switches `activeEvent` to match template's event. |
| `type: "update"` | `{ patch: object }` | Shallowly merges `patch` into the active draft. If `patch.eventType` is supplied, applies to that event's draft. |
| `type: "reset"` | *none* | Re-instantiates default configuration for `activeEvent` only. Other drafts are untouched. |

---

## 6. Template Dispatcher & Rendering Pipeline

The master dispatcher is `src/templates/Invitation.jsx`.

### Dispatch Logic
```javascript
const currentKey = config.style || config.template;
const isDedicatedStationery =
  ["deckle", "velure", "polaroid", "estate", "purple", "lavender"].includes(currentKey) ||
  ["deckle", "velure", "polaroid", "estate", "purple", "lavender"].includes(config.layout);

const Template =
  templates[currentKey] ||
  (isDedicatedStationery ? templates[config.layout] : null) ||
  MinimalLuxury;
```

### Dedicated Stationery vs. Classic Layouts
- **Dedicated Stationery (`deckle`, `velure`, `polaroid`, `estate`, `purple`):**
  Self-contained, full-page editorial mobile invitations with custom built-in sections (Hero, couple story, calendar, photos, schedule, directions, and RSVP). They do **not** render the shared `InvitationSections` beneath them.
- **Classic Layouts (`minimal`, `classic`, `romantic`, `floral`, `royal`, `modern`, etc.):**
  Render the hero presentation component, followed by the shared modular `InvitationSections` (`src/sections/InvitationSections.jsx`).
- **Ardhas Order Sheet:**
  Automatically appended at the end of every invitation (`<ArdhasOrderSheet config={config} />`) when `compact={false}` to provide client production notes on print / preview.

---

## 7. Universal Media Engine (`src/utils/media.js`)

All image and video fields in Ardhas support standard image links, uploaded file data, and YouTube videos.

### Key Functions
- `parseYouTubeUrl(input)`: Parses `youtube.com/watch?v=ID`, `youtu.be/ID`, `/embed/ID`, `/shorts/ID`, or raw 11-character video IDs. Returns:
  ```json
  {
    "isYouTube": true,
    "videoId": "aqz-KE-bpKQ",
    "embedUrl": "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?rel=0&modestbranding=1",
    "thumbnailUrl": "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
    "maxresThumbnailUrl": "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    "standardUrl": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
  }
  ```
- `isVideoUrl(input)`: Detects if a source is a YouTube link, an `.mp4`/`.webm` URL, or a video Blob.
- `getMediaThumbnail(input)`: Returns the YouTube HQ thumbnail for YouTube videos, or the original URL for static images.
- `getMediaDisplayType(input)`: Returns `'youtube'`, `'video'`, `'image'`, or `'empty'`.

---

## 8. Client Handoff & Export Subsystem (`src/utils/clientExport.js`)

When a client design is finalized, the **Client Handoff Panel** (`src/components/ClientHandoffPanel.jsx`) enables instant production bundle generation:

1. **Project ID Validation (`validateProjectId`):**
   - Format: `^[a-z0-9-]{3,40}$` (e.g., `ard-2026-aarav-diya`).
   - If invalid, export actions are disabled and an error prompt is displayed.
2. **JSON Export (`downloadClientJson`):**
   - Strips Base64 image/video blobs to keep JSON lightweight (<50 KB).
   - Conforms strictly to `docs/client-details.schema.json`.
   - File naming: `<project-id>_client-details.json`.
3. **Checklist Export (`downloadMediaChecklist`):**
   - Generates a Markdown media asset checklist indicating required aspect ratios, filenames (`<project-id>_<SLOT_ID>.<ext>`), and submission instructions for the client.
4. **Print / PDF Generation (`downloadClientPdf`):**
   - Uses `jsPDF` to compile a multi-page, formatted luxury client specification dossier including wedding party details, schedule, custom fields, and media slot status.
5. **Image Bundle (`downloadAllUploadedImages`):**
   - Extracts all in-memory client-uploaded images and triggers sequential downloads with correct canonical slot filenames.

---

## 9. Testing & Quality Invariants

Run the test suite using:
```bash
npm test
```

### Coverage Overview (24 Automated Tests)
1. **`invitationState.test.js` (5 tests):**
   - 16 occasions catalog verification
   - 80 unique template IDs verification
   - 5 unique layouts per occasion
   - Independent draft preservation during occasion switching
   - Template selection and default isolation
2. **`Housewarming.test.js` (1 test):**
   - JSDOM integration: entrance door transition, 3x3 puzzle completion/reset, decoration canvas, RSVP handoff, and GPS coordinates verification.
3. **`clientExport.test.js` (11 tests):**
   - Project ID validation rules
   - Custom Field ID validation rules (`lower_snake`)
   - Default state schema integrity
   - Media slot uniqueness across all templates
   - Expected filename generation
   - JSON sanitization (no Base64)
   - PDF generation without throw
4. **`media.test.js` (7 tests):**
   - Parsing standard watch URLs, short URLs, embeds, shorts
   - Rejection of invalid links
   - Thumbnail generation
   - Display type classification

---

## 10. AI Agent Playbooks & Implementation Recipes

### Recipe A: Adding a New Occasion
1. Open `src/data/events.js`.
2. Add the occasion key to the `events` object with required properties:
   - `type`, `slug`, `names`, `eyebrow`, `line`, `storyTitle`, `story`, `imageKey`, `time`, `venue`, `address`, `dress`.
   - `designs`: Array of 5 design tuples `[name, style, color]`. Ensure all 5 use distinct styles/layouts.
   - `memories`, `schedule`.
3. Add default gallery image mapping in `galleryKeys` inside `getEventDefaults()`.
4. Update `eventTypes` in `docs/client-details.schema.json` enum if the occasion should be supported in JSON schema exports.
5. Run `npm test` to verify `eventTypes.length` and template count invariants.

### Recipe B: Adding a New Template
1. Create template component in `src/templates/YourTemplate.jsx`.
2. Import and register in `src/templates/Invitation.jsx` in the `templates` dictionary.
3. If it requires dedicated styling, add `src/styles/your-template.css` and import in `YourTemplate.jsx` or `src/styles/global.css`.
4. If it has custom media slots, update `src/data/mediaSlots.js`.
5. Run `npm test` and `npm run build`.

### Recipe C: Modifying Client Export Data
1. Modify schema in `docs/client-details.schema.json`.
2. Update `buildClientDetails()` in `src/utils/clientExport.js` to populate the new fields.
3. Update `clientExport.test.js` to assert the presence and correctness of the new fields.
4. Run `npm test`.

---

## 11. Command Reference

```bash
# Start local development server (host 127.0.0.1:5173)
npm run dev

# Run all 24 unit and integration tests
npm test

# Build production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```
