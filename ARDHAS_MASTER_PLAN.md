# ARDHAS MASTER PLAN

**Document version:** 1.0  
**Created:** 2026-10-10  
**Repository:** https://github.com/ardhaseinvites/ardhas-invitations  
**Local path:** `D:\ardhas-invitations`  
**Status:** Living document — update this file as decisions are made and features are built.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Business Concept](#2-business-concept)
3. [Target Customers](#3-target-customers)
4. [Customer Acquisition Model](#4-customer-acquisition-model)
5. [Service and Revenue Model](#5-service-and-revenue-model)
6. [Existing Repository Audit](#6-existing-repository-audit)
7. [Current Technical Stack](#7-current-technical-stack)
8. [Current Features and Limitations](#8-current-features-and-limitations)
9. [Functional Requirements](#9-functional-requirements)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Client Journey](#11-client-journey)
12. [Template Selection Workflow](#12-template-selection-workflow)
13. [Standard Client Data Fields](#13-standard-client-data-fields)
14. [Custom and Template-Specific Fields](#14-custom-and-template-specific-fields)
15. [JSON Schema and Example](#15-json-schema-and-example)
16. [Media Slots and Naming Conventions](#16-media-slots-and-naming-conventions)
17. [PDF and Export Workflow](#17-pdf-and-export-workflow)
18. [Client Media Submission Workflow](#18-client-media-submission-workflow)
19. [Custom-Template Workflow](#19-custom-template-workflow)
20. [Folder Structure and File Responsibilities](#20-folder-structure-and-file-responsibilities)
21. [Client-Tracking Spreadsheet](#21-client-tracking-spreadsheet)
22. [Generation Script Design](#22-generation-script-design)
23. [Unique URL and Publication Design](#23-unique-url-and-publication-design)
24. [Hosting and Storage Options](#24-hosting-and-storage-options)
25. [Domain and HTTPS Requirements](#25-domain-and-https-requirements)
26. [WhatsApp Previews and QR Codes](#26-whatsapp-previews-and-qr-codes)
27. [Image and Video Optimization](#27-image-and-video-optimization)
28. [Privacy and Security](#28-privacy-and-security)
29. [Error Handling and Validation](#29-error-handling-and-validation)
30. [Testing Strategy](#30-testing-strategy)
31. [Phased Implementation Roadmap](#31-phased-implementation-roadmap)
32. [Future Enhancements](#32-future-enhancements)
33. [Decisions Already Made](#33-decisions-already-made)
34. [Decisions Still Open](#34-decisions-still-open)
35. [Risks and Limitations](#35-risks-and-limitations)
36. [Acceptance Criteria](#36-acceptance-criteria)
37. [Glossary of Technical Terms](#37-glossary-of-technical-terms)
38. [Immediate Next Steps](#38-immediate-next-steps)

---

## 1. Project Overview

Ardhas is a digital invitation creation service based in Kerala, India. The founder creates beautiful, mobile-first, interactive digital invitations for weddings and other events. Invitations are shared through WhatsApp and other messaging platforms.

The current phase of the project is a **service business**, not a self-service software product. The founder manually prepares each invitation on behalf of the client. A React-based website already exists as a portfolio and template showcase. The goal is to turn this existing codebase into the operational backbone of the service.

The name **Ardhas** (आर्दस / ardhas) is used consistently across the brand. The Instagram handle is `ardhas_wedding_company`. WhatsApp contact is `+91 9048503717`.

### What exists today

A fully functional React/Vite single-page application, locally cloned at `D:\ardhas-invitations`, is already deployed to GitHub Pages at:

```
https://ardhaseinvites.github.io/ardhas-invitations/
```

This application includes a homepage, a template gallery with 36 designs across 12 event types, a live design studio (customizer), a full-screen invitation preview, a dedicated housewarming invitation, and various supporting components.

### What this document covers

This document records the complete project understanding: what is already built, what needs to be built, the operational model, the technical architecture, the data model, the client workflow, and the implementation roadmap.

> [!IMPORTANT]
> This document is the primary reference for the project. Update it when decisions change. Do not let it become outdated.

---

## 2. Business Concept

Ardhas creates digital invitations that replace traditional printed cards. Instead of a paper card, the client receives a unique web address (URL) that they can share via WhatsApp, and a QR code that guests can scan.

The invitation is a full web page that can contain:

- Names, family details, and host information
- Event date, time, and venue
- A live countdown to the event
- Multiple event schedules (ceremony, lunch, reception, etc.)
- A personal story section with memorable milestones
- A photograph gallery with masonry or slideshow layout
- A background or highlight video
- Background music (synthesized demo; replaced with a licensed track for real clients)
- RSVP interaction
- Guest wishes carousel
- Gift registry links
- Family and contact details with phone/email links
- Map directions link
- A printable PDF through the browser's print dialog

### Design philosophy

Invitations should feel personal, premium, and emotionally resonant. They should look beautiful on a mobile phone, because most guests will open a WhatsApp link on their phone.

The visual style includes:
- Ivory and warm tones as default palette
- Serif typography (Cormorant Garamond) for elegance
- Clean sans-serif (DM Sans) for readability
- Six named visual styles: minimal, classic, romantic, floral, royal, modern
- Seven background styles: Plain, Gradient, Floral, Marble, Glass, Traditional Pattern, Custom Image
- Seven decoration motif options: Flowers, Leaves, Sparkles, Lanterns, Butterflies, Hearts, Temple Pattern
- Event-specific visual motifs (e.g., entwined rings for weddings, marigold motifs for Haldi)

### Language

The current application is in English. Malayalam content support is a future goal.

---

## 3. Target Customers

**Primary:** Couples planning weddings in Kerala and wider India, who want a beautiful alternative to printed invitations.

**Secondary (near-term):**
- Families hosting housewarming ceremonies (Griha Pravesh)
- Families hosting engagement parties, Mehendi, Haldi, or receptions as part of a wedding
- Parents hosting baby showers or naming ceremonies
- Individuals celebrating milestone birthdays or anniversaries

**All supported event types (12 total):**

| Event Type | Slug | Example Names |
|---|---|---|
| Wedding | wedding | Aarav & Diya |
| Engagement | engagement | Arjun & Meera |
| Birthday | birthday | Ananya |
| Housewarming | housewarming | The Nair Family |
| Baby Shower | baby-shower | Meera & Our Little Miracle |
| Anniversary | anniversary | Rajesh & Lakshmi |
| Naming Ceremony | naming-ceremony | Baby Aadhya |
| Save the Date | save-the-date | Aarav & Diya |
| Reception | reception | Aarav & Diya |
| Mehendi | mehendi | Diya's Mehendi |
| Haldi | haldi | Aarav & Diya |
| Other | celebration | (any gathering) |

---

## 4. Customer Acquisition Model

The initial acquisition strategy relies on personal relationships and referrals, not paid advertising or organic search.

**The photographer partnership:**

A friend who is a wedding photographer introduces Ardhas to couples who are already booking photography services. This provides a natural entry point because:
- The couple already trusts the photographer.
- The photographer can show sample invitations during the consultation.
- The photographer can help explain the value of a digital invitation.
- No marketing spend is needed in the early phase.

**The referral funnel:**

```
Photographer introduces Ardhas
        ↓
Couple views sample invitations (via website or WhatsApp demo link)
        ↓
Couple chooses a template or requests a custom design
        ↓
Couple provides details and media
        ↓
Ardhas prepares and delivers the invitation
        ↓
Couple shares the invitation URL and QR code with guests
        ↓
Guests open the invitation → potential new clients
```

> [!NOTE]
> Do not invest in paid advertising or SEO optimization in the early phase. Focus on delivering excellent invitations for early clients and using the results as portfolio evidence for future referrals.

---

## 5. Service and Revenue Model

Ardhas is a **service business**, not a self-service product. The founder creates each invitation on behalf of the client.

**How revenue is generated:**

The client pays a fee to have Ardhas create and publish their invitation. The fee may vary based on:
- Complexity of the invitation (number of sections, events, languages)
- Whether the client uses an existing template or requires a custom design
- Volume of media (number of photos, video editing requirements)
- Turnaround time
- Any post-publication edits or updates

**What is not decided:**

Specific pricing is a business decision that has not been finalized. Do not make price commitments without validating demand and cost through the first few real client engagements. Track time spent on each invitation to understand the real cost of delivery before setting prices.

**What is not in scope initially:**

- A subscription model
- A self-service payment platform
- Automatic invoicing
- A customer portal for managing past invitations

---

## 6. Existing Repository Audit

This section documents the findings from a thorough inspection of the repository at `D:\ardhas-invitations` as of 2026-10-10.

### 6.1 Repository summary

| Property | Value |
|---|---|
| Repository name | ardhas-invitations |
| Version | 1.0.0 |
| Type | React SPA (Single-Page Application) |
| Build tool | Vite 7.3.1 |
| Node version required | 22.12+ or 24+ |
| Package manager | npm |
| Module type | ESM (`"type": "module"`) |
| GitHub Pages URL | https://ardhaseinvites.github.io/ardhas-invitations/ |

### 6.2 Existing application routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Homepage with hero, template gallery, feature list, and booking CTA |
| `/customizer` | `Customizer.jsx` | Live design studio with sidebar editor and preview |
| `/preview` | `Preview.jsx` | Full-screen invitation preview with PDF print button |
| `/housewarming` | `Housewarming.jsx` | Dedicated housewarming invitation (Vazhappalli Thekkathil family) |
| `*` (catch-all) | Inline in App.jsx | Friendly 404 page |

All routes except the homepage are lazy-loaded with React `Suspense` for faster initial page load.

### 6.3 Template gallery — verified counts

> [!IMPORTANT]
> The claim of "36 designs across 12 event types" is **verified accurate** against the source code.

From `src/data/events.js`, confirmed by `invitationState.test.js`:

- **12 event types** — confirmed by `assert.equal(eventTypes.length, 12)`
- **36 template designs** — confirmed by `assert.equal(new Set(templates.map(t => t.id)).size, 36)`
- **3 designs per event** — confirmed: each event has exactly 3 designs with layouts `editorial`, `arch`, and `split`

The template IDs follow the pattern `{slug}-{1|2|3}`, e.g., `wedding-1`, `wedding-2`, `wedding-3`.

**The 7 visual styles available:**

| Style key | Display name | Template component |
|---|---|---|
| `minimal` | Minimal/Luxury | `MinimalLuxury.jsx` → `Welcome.jsx` |
| `classic` | Classic/Traditional | `ClassicTraditional.jsx` |
| `romantic` | Modern/Romantic | `ModernRomantic.jsx` |
| `floral` | Floral/Elegant | `FloralElegant.jsx` |
| `royal` | Royal/Premium | `RoyalPremium.jsx` |
| `modern` | Contemporary | `Contemporary.jsx` |
| `custom` | Custom Theme | `CustomTheme.jsx` |

> [!NOTE]
> All six named style components (`MinimalLuxury`, `ClassicTraditional`, `ModernRomantic`, `FloralElegant`, `RoyalPremium`, `Contemporary`) currently delegate rendering to the same base `Welcome.jsx` hero component. The visual differentiation is achieved through CSS class names on the root `article` element and through CSS variables, not through distinct JSX template structures. The `CustomTheme.jsx` is available but not wired to any event type's default design list.

### 6.4 State management — verified

State is managed with React's `useReducer` in `InvitationContext.jsx`. The state object contains:

- `activeEvent` — the currently selected event type (e.g., `"Wedding"`)
- `drafts` — an object keyed by event type, each value being a complete invitation configuration

Key behaviors (verified by automated tests):

- Switching event types preserves each event's draft independently in memory.
- Applying a template changes style/layout/color/font but does not overwrite authored content (names, story, venue).
- Resetting affects only the currently active event's draft.
- Invalid event or template IDs cannot corrupt the state.
- All drafts are lost on page refresh (no browser storage, no server persistence).

### 6.5 Customizer — verified fields

The customizer (`Customizer.jsx`) has three tabs: **Content**, **Design**, and **Sections**.

**Content tab — editable fields:**

| Group | Fields |
|---|---|
| Names, date & story | Names/host, age (Birthday only), milestone (Anniversary only), event date, event time, UTC offset, story text |
| Venue & directions | Venue name, full address, Google Maps search query, directions link URL, dress code |
| Photos & video | Welcome image (upload or URL), hero background video URL (MP4), video cover image, video URL (YouTube or MP4) |
| Gallery | Multiple photos with image upload and alt text; add/remove/reorder |
| Story memories | Up to N timeline entries, each with a title and text; add/remove/reorder |
| Schedule | Up to N events, each with time, title, and details; add/remove/reorder |
| Guest wishes | Up to N wishes, each with message and author; add/remove/reorder |
| Gift registry | Up to N items, each with title, description, and URL; add/remove/reorder |
| Family & contacts | Up to N contacts, each with name, role, phone, and email; add/remove/reorder |
| All invitation text | Searchable list of all ~50 copy strings (labels, headings, captions, RSVP text, etc.) |

**Design tab:**

- Signature color: 6 preset swatches or a custom color picker
- Font style: Serif, Minimal, Modern, Royal, Handwritten
- Background style: Plain, Gradient, Floral, Marble, Glass, Traditional Pattern, Custom Image
- Background image upload (active when "Custom Image" is selected)
- Decoration toggles: Flowers, Leaves, Sparkles, Lanterns, Butterflies, Hearts, Temple Pattern

**Sections tab:**

Toggle each section on/off: story, details, schedule, gallery, video, rsvp, wishes, registry, contacts, countdown, music.

### 6.6 Image upload — verified behavior

The `ImageField` component accepts JPG, PNG, WebP, or GIF images up to 5 MB.

When a file is selected:
1. It is read as a Base64 data URL using `FileReader`.
2. It is validated by loading it into an `Image` element.
3. If valid, it is stored in React state as a data URL string.
4. The invitation preview updates immediately.

> [!CAUTION]
> **Images are stored only in React memory.** They are not uploaded to any server, not saved to `localStorage`, and are lost on page refresh. The UI correctly displays a hint: "Images stay in this session." No code exists to upload files to any storage service.

### 6.7 Video handling — verified behavior

The invitation supports two types of video:

1. **Hero background video** (`heroVideoUrl`): a muted, looping MP4 or WebM video that plays automatically in the hero section as a background (replaces the still photo). Only HTTPS MP4/WebM URLs are accepted. Local uploads are not supported for video.

2. **Invite video** (`videoUrl`): a video displayed in a dedicated section. Supports YouTube watch URLs, YouTube Shorts, youtu.be short links, and direct MP4/WebM URLs. The video is not shown until the user clicks a play button (privacy-friendly). The `InvitationSections.jsx` code parses the URL to determine whether to embed a YouTube iframe or display a native video element.

> [!NOTE]
> No video file upload is supported in the current browser application. Clients must provide a publicly accessible URL or send the video file separately for the founder to host elsewhere and link.

### 6.8 PDF export — verified behavior

The "Save PDF" button in the preview toolbar calls `window.print()`. This opens the browser's native print/save-as-PDF dialog.

Limitations verified from `VERIFICATION.md`:
- "Print styling is retained but final PDF pagination has not been visually inspected."
- Videos are not playable in a PDF; they appear as a static poster image or are omitted.
- The PDF quality depends on whether the user enables "Background graphics" in the browser print dialog.
- There is no custom PDF generation library (e.g., `jsPDF`, `html2pdf`). It is browser-print only.

### 6.9 RSVP — verified behavior

The RSVP form is a fully working UI demo:
- Collecting name, email, attendance choice, guest count, and a note.
- On submit, a success animation is shown.
- **No data is transmitted or stored.** The form text confirms: "This is a preview; your response has not been sent or stored."

No backend endpoint, webhook, or email delivery exists for RSVP responses.

### 6.10 Booking inquiry — verified behavior

The "Book your website" button opens a `BookingDialog` modal. The form accepts a name, email, and event description. On submit, a "success" screen appears. The form itself states: "This is a demonstration form" and "No personal details are transmitted."

**No inquiry is sent anywhere.** A business email must be connected before launch.

### 6.11 Housewarming page — verified

The `/housewarming` route is a **real, client-specific invitation** for "Vazhappalli Thekkathil" family at Sasthamcotta, Kollam, Kerala. This is not a demo — it was built for an actual housewarming event on **20 September 2026**.

Key facts:
- Hardcoded data in `src/data/housewarming.js`
- Includes real GPS coordinates: 9.0478333333°N, 76.6006944444°E
- WhatsApp link points to real Ardhas number: `+91 9048503717`
- Instagram link: `ardhas_wedding_company`
- Includes an AI-generated concept illustration in `public/housewarming-home.jpg` (~450 KB)
- Contains an interactive puzzle game, bell interaction, and lamp interaction
- RSVP is handled by WhatsApp handoff (not automated)

### 6.12 Deployment — verified

**GitHub Actions workflow** at `.github/workflows/deploy-pages.yml`:

Trigger: push to `main` branch, or manual dispatch.

Steps: checkout → Node 24 setup → `npm ci` → `npm test` → `npm run build` → deploy `dist/` to GitHub Pages.

**Vite base path configuration** in `vite.config.js`:
- When built in GitHub Actions (`GITHUB_ACTIONS=true`): base is `/ardhas-invitations/`
- When built locally: base is `/`

**SPA routing on GitHub Pages** is handled by a `public/404.html` redirect script that stores the intended path in `sessionStorage` and redirects to the base URL. The `index.html` reads from `sessionStorage` on load and restores the original path using `history.replaceState`.

**Current deployment URL:** `https://ardhaseinvites.github.io/ardhas-invitations/`

**No custom domain is configured.** The README mentions purchasing a domain as a future step.

### 6.13 Automated tests — verified

The test command is: `node --test src/context/invitationState.test.js src/pages/Housewarming.test.js`

This uses Node.js's built-in test runner (no Jest, Vitest, or similar).

**`invitationState.test.js`** (5 tests):
1. Every occasion has 3 dedicated designs and its own content.
2. Switching occasions preserves each independent draft.
3. Applying a design selects its event without losing authored content.
4. Reset restores only the active occasion; defaults never share mutable data.
5. Invalid deep-link event or template cannot corrupt state.

**`Housewarming.test.js`**: A jsdom integration test covering housewarming entry, puzzle completion/reset, decoration, gallery focus restoration, phone validation, RSVP contents, and map coordinates.

> [!NOTE]
> Tests run in Node.js without a real browser. Visual layout, pointer drag physics, live maps, and PNG rendering are not covered by automated tests.

### 6.14 Feature classification

**Implemented and working:**
- Homepage with template gallery (36 designs, 12 event types, filterable)
- Template selection with URL-based deep linking (`?event=Wedding&theme=wedding-1`)
- Live customizer with all content, design, and section controls
- Desktop and mobile preview size toggle in the customizer
- Real-time invitation preview alongside the editor
- Photo uploads (local, session-only, up to 5 MB)
- YouTube and MP4 video embedding in invitations
- Section visibility toggling
- Per-event draft isolation in React context
- Reset to demo defaults
- Full-screen invitation preview at `/preview`
- PDF via browser print dialog
- Live countdown timer
- Image gallery with masonry and slider views, lightbox, keyboard navigation
- Guest wishes carousel (Swiper)
- RSVP form (UI demo, no backend)
- Gift registry cards (UI demo)
- Family/contact details section with tel/mailto links
- Google Maps directions link
- Background music (synthesized, plays on user interaction)
- Booking inquiry dialog (UI demo, no backend)
- WhatsApp and Instagram links (real)
- Dedicated housewarming invitation (real client, real data)
- GitHub Pages deployment via Actions
- SPA routing fallback via 404.html trick
- 9 automated tests passing

**Implemented but incomplete or requiring testing:**
- PDF export: print-dialog approach works but pagination has not been visually tested
- `CustomTheme.jsx` template: component exists but is not wired to any default event design
- `react-dnd` and `react-dnd-html5-backend` are installed but no drag-and-drop is used in any currently rendered component (the `Repeater` uses up/down arrow buttons instead)
- `html-to-image` is listed as a dependency but no code in the application imports or uses it
- `lottie-react` is installed; it is used in the housewarming page for the rangoli animation
- `canvas-confetti` is installed; it is referenced in the housewarming games component
- Social Open Graph metadata: `react-helmet` sets page `<title>` and `<meta name="description">` dynamically, but no `<meta property="og:*">` tags are set. WhatsApp link previews may not show the correct invitation name, image, or description.

**Not implemented:**
- Client data export to JSON file
- Media checklist generation
- Custom field support (adding fields not in the standard form)
- Structured client-specific invitation generation (running a script to produce a client's personalized invitation)
- Unique per-client URL routes (all visitors share the same `/preview` route with the same demo data)
- QR code generation
- Persistent client data storage (any kind)
- Upload to a remote media storage service
- Backend API or server
- Authentication or user accounts
- RSVP data submission and storage
- Email inquiry delivery

**Proposed future functionality:**
- Custom domain (`ardhas.in` or similar)
- Per-invitation unique public URLs (e.g., `/invite/aswin-weds-anisree`)
- Static pre-rendering or SSR for accurate WhatsApp/social previews
- Automated media upload service
- Client-facing data entry form that exports a JSON
- Local generation script to produce a personalized build from a JSON file
- Malayalam language support

---

## 7. Current Technical Stack

### Production dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^19.2.0 | UI framework |
| react-dom | ^19.2.0 | React DOM renderer |
| react-router-dom | ^7.13.0 | Client-side routing |
| framer-motion | ^12.34.0 | Page transitions, animated sections, countdown |
| gsap | ^3.14.0 | Hero parallax, entrance animations |
| tailwindcss | ^4.2.0 | Utility CSS (via Vite plugin) |
| @tailwindcss/vite | ^4.2.0 | Tailwind Vite integration |
| lucide-react | ^0.577.0 | Icon library |
| swiper | ^12.1.0 | Gallery slider, wishes carousel |
| react-intersection-observer | ^10.0.0 | Scroll-triggered reveal animations |
| react-helmet | ^6.1.0 | `<head>` metadata management |
| react-icons | ^5.7.0 | Additional icon sets (Phosphor icons, used in Housewarming) |
| lottie-react | ^3.1.2 | Rangoli animation (Housewarming) |
| canvas-confetti | ^1.9.4 | Confetti effects (Housewarming games) |
| html-to-image | ^1.11.13 | Installed but not currently used in any component |
| react-dnd | ^16.0.1 | Installed but not currently used in any component |
| react-dnd-html5-backend | ^16.0.1 | Installed but not currently used in any component |

### Dev dependencies

| Package | Version | Purpose |
|---|---|---|
| vite | ^7.3.1 | Build tool and dev server |
| @vitejs/plugin-react | ^5.1.4 | React Fast Refresh and JSX transform |
| jsdom | ^30.1.0 | DOM environment for housewarming integration tests |

### Fonts (external, loaded from Google Fonts)

| Font | Style | Usage |
|---|---|---|
| Cormorant Garamond | Regular, Medium, SemiBold, Italic | Serif headings, invitation titles |
| DM Sans | Regular, Medium, SemiBold, Bold | UI text, sans-serif option |
| Italianno | Regular | Handwritten style option |

> [!WARNING]
> Fonts, external Unsplash images, and the YouTube sample video require internet access. They must be replaced with locally hosted or licensed assets before deploying a real client invitation, to ensure the invitation loads reliably for guests and does not depend on third-party services that may change or disappear.

### CSS approach

Global styles use Tailwind 4 `@import "tailwindcss"` in `global.css`. The application also uses extensive custom CSS in component-specific stylesheet files. Tailwind utility classes are minimal in the current codebase; most layout and design is done with custom CSS using BEM-style class names.

---

## 8. Current Features and Limitations

### Key capabilities

1. A complete, polished marketing homepage that serves as a portfolio of available templates.
2. A live design studio where invitations can be customized in real time.
3. A full-screen preview that represents what a published invitation would look like.
4. A dedicated real-client housewarming invitation demonstrating what a published product looks like.
5. GitHub Actions CD pipeline that deploys to GitHub Pages on every push to `main`.
6. Automated state management tests that run as part of the CI pipeline.

### Key limitations

| Limitation | Impact |
|---|---|
| No persistent storage | All customization is lost on page refresh. There is no way to save or resume work. |
| Single shared state | All visitors see the same global demo state. There are no per-client invitation URLs. |
| No JSON export | Clients cannot download a structured file of their entered details. |
| No media delivery | Images uploaded in the browser stay in the session. They cannot be transferred to the founder's computer through the application. |
| No video upload | Video must be provided as an external URL (YouTube or hosted MP4). |
| No RSVP backend | Guest responses cannot be collected, stored, or notified. |
| No booking backend | Booking inquiries are demo-only. No message is sent. |
| Browser-only PDF | PDF relies on `window.print()`. Quality and pagination are browser-dependent. |
| Client-side metadata only | `react-helmet` sets the page title dynamically in React. When a page is first loaded, the raw HTML only contains the generic title. WhatsApp and other crawlers that do not execute JavaScript will read the generic title and description, not the client-specific content. |
| No custom domain | The site is at `ardhaseinvites.github.io/ardhas-invitations/`, not a branded domain. |
| Unused packages | `react-dnd`, `react-dnd-html5-backend`, and `html-to-image` are installed but not used. |
| Illustrative media | All photos are Unsplash stock images. All gallery images reference external URLs. There are no locally hosted client photographs in the public gallery. |

---

## 9. Functional Requirements

These are the requirements for the complete operational service.

### 9.1 Client-facing template browsing

- FR-01: Clients must be able to browse 36 template designs organized by event type.
- FR-02: Each template card must show a live preview thumbnail of the invitation.
- FR-03: Clients must be able to filter templates by event type.
- FR-04: Each template must have a "Live preview" link that opens the full invitation demo.
- FR-05: Each template must have an "Apply template" link that opens the customizer.

### 9.2 Client data entry

- FR-06: The customizer must support all standard fields listed in Section 13.
- FR-07: The client must be able to upload photographs for preview in the correct slot.
- FR-08: The client must be able to provide a video URL for preview.
- FR-09: The client must be able to toggle invitation sections on or off.
- FR-10: The client must be able to reorder items within repeatable sections (schedule, gallery, memories, wishes, contacts, registry).
- FR-11: [Future] The client must be able to add custom fields beyond the standard set.

### 9.3 Client data export

- FR-12: The client must be able to download a structured JSON file containing all entered data.
- FR-13: The JSON must include a schema version, project metadata, template ID, and all field values.
- FR-14: The JSON must include media slot identifiers for each media location.
- FR-15: The JSON must not include actual image data (no Base64 blobs); only identifiers and external URLs.

### 9.4 Media checklist

- FR-16: A downloadable media checklist must identify every required and optional media slot for the selected template.
- FR-17: Each media slot entry must include its identifier, a description, whether it is required or optional, and the accepted file type.

### 9.5 Invitation generation

- FR-18: The founder must be able to run a local script that reads a client JSON file and produces a ready-to-publish invitation build.
- FR-19: The script must validate all required fields and media files before generating the build.
- FR-20: The script must report clear errors when required data or files are missing.
- FR-21: The generated invitation must use the selected template's design and the client's data.
- FR-22: The generated invitation must be a static build that can be deployed to a static host.

### 9.6 Publication

- FR-23: Each client must receive a unique, stable, shareable URL.
- FR-24: The URL must remain accessible after the founder closes the local application.
- FR-25: Guests must not need to log in to view the invitation.
- FR-26: The invitation must be mobile-responsive and work correctly when opened from WhatsApp.

### 9.7 QR code

- FR-27: After publication, a QR code must be generated containing the client's invitation URL.
- FR-28: The QR code must be saved as an image file suitable for printing.
- FR-29: If the URL changes, the QR code must be regenerated.

### 9.8 Privacy and approval

- FR-30: The client must review and approve the invitation before it is published.
- FR-31: Client data files must not be committed to the public Git repository.
- FR-32: Client data files must not be included in the publicly accessible `dist/` output.

---

## 10. Non-Functional Requirements

- **NFR-01 Mobile performance:** The invitation page must load and render correctly on a typical Indian mobile connection (4G). Images should be optimized to minimize file size.
- **NFR-02 Responsiveness:** The invitation must look correct on screen widths from 320 px to 1920 px.
- **NFR-03 Accessibility:** The invitation must support keyboard navigation, focus management, and screen reader text for interactive elements (already partially done in the existing codebase).
- **NFR-04 Reduced motion:** Decorative animations must be suppressed when the user has enabled the `prefers-reduced-motion` system setting (already implemented).
- **NFR-05 WhatsApp preview:** The invitation page must include correct Open Graph metadata so that WhatsApp displays the client's names, event type, and a suitable preview image when the link is shared.
- **NFR-06 HTTPS:** The published invitation must be served over HTTPS.
- **NFR-07 Link stability:** Published invitation URLs must not change after delivery to the client without explicit notification and a redirect.
- **NFR-08 Build reproducibility:** Given the same client JSON and media files, the generation script must produce a consistent output.
- **NFR-09 Privacy:** No real client personal data (names, phone numbers, email addresses) should be committed to the public Git repository or served in any publicly accessible file other than the invitation itself.

---

## 11. Client Journey

### 11.1 Type A — Standard template

```
1. Client is introduced to Ardhas by the photographer
2. Client browses the Ardhas website (or receives a demo link via WhatsApp)
3. Client selects a template that fits their event and aesthetic
4. Client opens the customizer and fills in their details
5. Client uploads sample photos for preview (local session only)
6. Client previews the invitation in desktop and mobile views
7. Client downloads:
   a. The client details JSON (proposed — not yet built)
   b. The media checklist (proposed — not yet built)
   c. A PDF snapshot via the browser print dialog
8. Client sends original photographs and videos to Ardhas
   (via WhatsApp, Google Drive, WeTransfer, or another agreed method)
9. Founder reviews the JSON, matches media to identifiers,
   and places files in the client project folder
10. Founder runs the generation script to create the invitation build
11. Founder reviews the generated invitation locally
12. Founder publishes the invitation to a hosting service
13. Founder verifies the live URL
14. Founder generates the QR code
15. Founder sends the client: the URL, the QR code image, and the PDF
16. Client approves and shares with guests via WhatsApp
```

### 11.2 Type B — Custom design

```
1-3. Same as Type A, but the client provides reference images or a design brief
4.  Founder manually creates or adapts a template in the codebase
5.  Client details and media are collected using the same process as Type A
6-16. Same generation and delivery workflow as Type A where possible
```

---

## 12. Template Selection Workflow

### How templates are stored

Templates are defined in `src/data/events.js` as data objects. Each event type has exactly three designs. The designs list contains `[name, style, color]` tuples. These are expanded into full template objects by the `templates` array with the following properties:

| Property | Example | Description |
|---|---|---|
| `id` | `"wedding-1"` | Unique stable identifier |
| `eventType` | `"Wedding"` | Parent event type |
| `name` | `"Ivory Vows"` | Display name in the gallery |
| `style` | `"minimal"` | Maps to a template component |
| `color` | `"#8d7045"` | Default accent color |
| `layout` | `"editorial"` | Layout variant (editorial/arch/split) |
| `font` | `"Serif"` | Default font choice |
| `background` | `"Plain"` | Default background style |
| `description` | `"A signature wedding..."` | Gallery card description |
| `tag` | `"SIGNATURE"` | Badge on the gallery card |

### How deep links work

Template gallery cards link to `/customizer?event=Wedding&theme=wedding-1`. The customizer reads these URL parameters on mount and calls `selectEvent()` and `applyTemplate()` to pre-select the correct event and template.

### How template application works

When a template is applied (via `applyTemplate(id)`), the reducer updates only the visual properties (`template`, `style`, `layout`, `color`, `font`, `background`) without overwriting authored content (names, story, dates, media, schedule, etc.).

---

## 13. Standard Client Data Fields

These are the fields currently supported by the customizer. They apply to most templates; individual templates may make some fields irrelevant.

### Identity and event fields

| Field key | Label in customizer | Notes |
|---|---|---|
| `eventType` | Event type | Selected from dropdown; 12 options |
| `template` | (template ID) | Set by template selection |
| `names` | Names / family / host | Free text; used prominently in the hero |
| `date` | Event date | HTML date picker (YYYY-MM-DD) |
| `time` | Event time | HTML time picker (HH:mm) |
| `timezone` | Time zone (UTC offset) | Free text; default +05:30 |
| `age` | Age / birthday number | Only shown for Birthday event type |
| `milestone` | Anniversary milestone | Only shown for Anniversary event type |
| `story` | Your story / occasion introduction | Free text, multiline |

### Venue and logistics fields

| Field key | Label | Notes |
|---|---|---|
| `venue` | Venue name | Short name shown on the hero |
| `address` | Full address | Full postal address |
| `mapQuery` | Google Maps search / coordinates | Used to construct the maps link if no direct URL is provided |
| `mapUrl` | Directions link (optional) | Takes priority over mapQuery when provided |
| `dressCode` | Dress code | Free text |

### Media fields

| Field key | Label | Notes |
|---|---|---|
| `heroImage` | Welcome image | Upload or URL; used as hero photo |
| `heroVideoUrl` | Welcome video URL | MP4/WebM URL only (HTTPS); plays muted in background |
| `videoPoster` | Video cover | Upload or URL; shown as the video thumbnail |
| `videoUrl` | Video URL | YouTube or MP4 URL; plays on user click |
| `image` | Background image | Upload or URL; active only when background is "Custom Image" |

### Repeatable array fields

Each item in these arrays has a stable `id` (a UUID) plus the fields shown.

| Array key | Items contain |
|---|---|
| `gallery` | `id`, `src` (image URL or data URL), `alt` |
| `memories` | `id`, `title`, `text` |
| `schedule` | `id`, `time`, `title`, `text` |
| `wishes` | `id`, `quote`, `author` |
| `registry` | `id`, `title`, `description`, `url` |
| `contacts` | `id`, `name`, `role`, `phone`, `email` |

### Design fields

| Field key | Options |
|---|---|
| `style` | minimal, classic, romantic, floral, royal, modern, custom |
| `layout` | editorial, arch, split |
| `color` | Any hex color |
| `font` | Serif, Minimal, Modern, Royal, Handwritten |
| `background` | Plain, Gradient, Floral, Marble, Glass, Traditional Pattern, Custom Image |

### Section visibility

Stored as `sections`, an object of boolean flags:

```
story, details, schedule, gallery, video, rsvp, wishes, registry, contacts, countdown, music
```

### Copy (text labels)

Stored as `copy`, an object of ~50 string keys. Every heading, button label, caption, and instruction in the invitation is customizable. Examples:

- `heroEyebrow` — text above the names (e.g., "TOGETHER WITH OUR FAMILIES")
- `invitationLine` — subtitle below the names
- `storyTitle` — heading for the story section
- `rsvpTitle` — heading for the RSVP section
- `pdfLabel` — label on the "Save PDF" button

### Missing standard fields

The following common wedding invitation fields are **not currently in the customizer** but are needed for real client invitations:

- Groom's full name (separate from the combined `names` field)
- Bride's full name
- Groom's father's name
- Groom's mother's name
- Bride's father's name
- Bride's mother's name
- Additional family members by name and relationship
- Multiple venue support (different locations for ceremony and reception)
- Event-specific sub-venues (e.g., separate ceremony and reception venues in one invitation)
- Client/project identifier

These can be added as additional fields or as custom fields using the planned custom field mechanism.

---

## 14. Custom and Template-Specific Fields

### 14.1 Why custom fields are needed

The current customizer has a fixed set of fields. Real wedding invitations regularly require content that does not fit the standard schema. Examples:

- A Namboothiri wedding may require listing multiple family names in a specific ceremonial order.
- A Kashmiri wedding may need separate sections for nikah and walima with distinct timings and venues.
- A Vishu celebration requires a specific greeting and cultural context.
- A client may want to list grandparents, siblings, or elders alongside parents.

### 14.2 Proposed custom field structure

Each custom field should have:

```json
{
  "id": "custom-field-uuid",
  "key": "groomsGrandfather",
  "label": "Groom's grandfather's name",
  "type": "text",
  "value": "Sri. Ramakrishnan Nair",
  "section": "family",
  "required": false
}
```

| Property | Description |
|---|---|
| `id` | A stable UUID for tracking |
| `key` | A machine-readable identifier for use in templates |
| `label` | A human-readable display name |
| `type` | Input type: `text`, `multiline`, `date`, `time`, `url`, `tel` |
| `value` | The entered value |
| `section` | Optional: which invitation section this belongs to |
| `required` | Whether the generation script should treat a missing value as an error |

### 14.3 Template-specific fields

Different templates may expose different sections and require different data. For example:

- A template with a venue map requires `mapQuery` or `mapUrl`.
- A template with an anniversary milestone requires `milestone`.
- A template with a baby name reveal requires a baby's name field.

The template configuration should declare:
- **Required fields:** fields that must be present for the template to render correctly.
- **Optional fields:** fields that are used if present but are gracefully omitted if missing.
- **Hidden fields:** fields that this template does not use.

This declaration is proposed for a future `template-manifest.json` file that accompanies each template.

---

## 15. JSON Schema and Example

### 15.1 Schema version and structure

The client JSON export must use a versioned schema to allow future changes without breaking the generation script.

**Top-level structure:**

```json
{
  "schema": "ardhas-client/1.0",
  "projectId": "aswin-weds-anisree",
  "generatedAt": "2026-10-10T12:00:00+05:30",
  "template": "wedding-1",
  "eventType": "Wedding",
  "content": { ... },
  "design": { ... },
  "sections": { ... },
  "media": { ... },
  "customFields": [ ... ],
  "publication": { ... }
}
```

### 15.2 Realistic example

```json
{
  "schema": "ardhas-client/1.0",
  "projectId": "aswin-weds-anisree",
  "generatedAt": "2026-10-15T09:30:00+05:30",
  "template": "wedding-1",
  "eventType": "Wedding",

  "content": {
    "names": "Nikhil & Anjali",
    "date": "2026-12-14",
    "time": "10:00",
    "timezone": "+05:30",
    "venue": "Leela Ashtamudi, Kollam",
    "address": "The Leela Ashtamudi, Thevally Palace Rd, Kollam, Kerala 691013",
    "mapQuery": "The Leela Ashtamudi Kollam",
    "mapUrl": "https://maps.google.com/?q=The+Leela+Ashtamudi+Kollam",
    "dressCode": "Festive traditional attire · Soft, joyful colors",
    "story": "A chance meeting at a college farewell turned into ten years of friendship, a thousand shared dreams, and the easiest question either of us ever answered. We cannot wait to begin forever with you beside us.",
    "heroEyebrow": "TOGETHER WITH OUR FAMILIES",
    "invitationLine": "Joyfully invite you to celebrate our wedding",
    "schedule": [
      {
        "id": "schedule-1",
        "time": "09:30",
        "title": "A warm welcome",
        "text": "Gather with our families and begin the celebration."
      },
      {
        "id": "schedule-2",
        "time": "10:00",
        "title": "The wedding ceremony",
        "text": "The moment we have been looking forward to."
      },
      {
        "id": "schedule-3",
        "time": "12:30",
        "title": "Lunch & laughter",
        "text": "Traditional Kerala lunch with our favorite people."
      },
      {
        "id": "schedule-4",
        "time": "18:00",
        "title": "Reception & dinner",
        "text": "An evening of music, memories, and celebration."
      }
    ],
    "memories": [
      {
        "id": "memory-1",
        "title": "The first hello",
        "text": "A college farewell, a borrowed pen, and a conversation that never really ended."
      },
      {
        "id": "memory-2",
        "title": "A thousand conversations",
        "text": "From late-night calls to morning walks, every day we found a new reason to choose each other."
      },
      {
        "id": "memory-3",
        "title": "Our forever begins",
        "text": "On this beautiful day, we begin the next chapter — and we cannot wait to share it with you."
      }
    ],
    "contacts": [
      {
        "id": "contact-1",
        "name": "Suresh & Latha Menon",
        "role": "Groom's family",
        "phone": "+91 98470 00001",
        "email": ""
      },
      {
        "id": "contact-2",
        "name": "Rajan & Suma Pillai",
        "role": "Bride's family",
        "phone": "+91 98470 00002",
        "email": ""
      }
    ],
    "wishes": [],
    "registry": []
  },

  "design": {
    "style": "minimal",
    "layout": "editorial",
    "color": "#8d7045",
    "font": "Serif",
    "background": "Plain",
    "decorations": {
      "Flowers": true,
      "Hearts": true,
      "Sparkles": true
    }
  },

  "sections": {
    "story": true,
    "details": true,
    "schedule": true,
    "gallery": true,
    "video": true,
    "rsvp": false,
    "wishes": false,
    "registry": false,
    "contacts": true,
    "countdown": true,
    "music": false
  },

  "media": {
    "HERO_IMAGE": {
      "slot": "HERO_IMAGE",
      "description": "Main welcome/hero photograph",
      "required": true,
      "type": "image",
      "filename": "HERO_IMAGE.jpg"
    },
    "VIDEO_POSTER": {
      "slot": "VIDEO_POSTER",
      "description": "Cover image shown before the video plays",
      "required": false,
      "type": "image",
      "filename": "VIDEO_POSTER.jpg"
    },
    "WEDDING_VIDEO": {
      "slot": "WEDDING_VIDEO",
      "description": "Video shown in the video section (YouTube URL or MP4)",
      "required": false,
      "type": "video",
      "url": "https://www.youtube.com/watch?v=example",
      "filename": null
    },
    "GALLERY_IMAGE_01": {
      "slot": "GALLERY_IMAGE_01",
      "description": "Gallery photograph 1",
      "required": false,
      "type": "image",
      "filename": "GALLERY_IMAGE_01.jpg"
    },
    "GALLERY_IMAGE_02": {
      "slot": "GALLERY_IMAGE_02",
      "description": "Gallery photograph 2",
      "required": false,
      "type": "image",
      "filename": "GALLERY_IMAGE_02.jpg"
    },
    "GALLERY_IMAGE_03": {
      "slot": "GALLERY_IMAGE_03",
      "description": "Gallery photograph 3",
      "required": false,
      "type": "image",
      "filename": "GALLERY_IMAGE_03.jpg"
    }
  },

  "customFields": [
    {
      "id": "custom-1",
      "key": "groomFullName",
      "label": "Groom's full name",
      "type": "text",
      "value": "Nikhil Suresh Menon",
      "section": "family",
      "required": false
    },
    {
      "id": "custom-2",
      "key": "brideFullName",
      "label": "Bride's full name",
      "type": "text",
      "value": "Anjali Rajan Pillai",
      "section": "family",
      "required": false
    }
  ],

  "publication": {
    "slug": "aswin-weds-anisree",
    "url": null,
    "publishedAt": null,
    "qrCodeFile": null,
    "status": "draft"
  }
}
```

### 15.3 Handling missing and invalid values

| Situation | Handling |
|---|---|
| Optional field is empty | Template renders without that element; no error |
| Required field is missing | Generation script reports an error and halts |
| Media file is missing (required slot) | Generation script reports an error and halts |
| Media file is missing (optional slot) | Generation script shows a warning; proceeds with a placeholder or omits the element |
| Client provides an unsupported file type | Generation script rejects the file and reports the expected type |
| Media identifier does not match any template slot | Generation script logs a warning; the file is ignored |
| Template expects a field not in the JSON | Template uses a sensible default or renders the element as empty |

> [!CAUTION]
> Never silently publish an invitation with missing required data. Always validate before publishing and confirm with the client that the invitation looks correct.

---

## 16. Media Slots and Naming Conventions

### 16.1 Standard media slot identifiers

| Identifier | Description | Type | Required |
|---|---|---|---|
| `HERO_IMAGE` | Main welcome photograph used as the hero background | image | Recommended |
| `HERO_VIDEO` | Background video for the hero section (muted, looping) | video (MP4/WebM) | Optional |
| `VIDEO_POSTER` | Thumbnail shown before the invitation video plays | image | Optional |
| `WEDDING_VIDEO` | The main invitation video (YouTube link or MP4) | video | Optional |
| `BACKGROUND_IMAGE` | Custom background pattern or texture | image | Optional |
| `GALLERY_IMAGE_01` | First gallery photograph | image | Optional |
| `GALLERY_IMAGE_02` | Second gallery photograph | image | Optional |
| `GALLERY_IMAGE_03` | Third gallery photograph | image | Optional |
| `GALLERY_IMAGE_04` | Fourth gallery photograph | image | Optional |
| `GALLERY_IMAGE_05` | Fifth gallery photograph | image | Optional |

Additional gallery images follow the pattern `GALLERY_IMAGE_06`, etc. Template manifests will declare the maximum number of gallery images each template supports.

### 16.2 File naming convention

When the client sends files, each file should be named using the media slot identifier, optionally prefixed with the project ID:

```
HERO_IMAGE.jpg
GALLERY_IMAGE_01.jpg
GALLERY_IMAGE_02.jpg
WEDDING_VIDEO.mp4
```

Or with a project prefix to avoid confusion when handling multiple clients:

```
aswin-weds-anisree_HERO_IMAGE.jpg
aswin-weds-anisree_GALLERY_IMAGE_01.jpg
```

The generation script should accept files in either naming convention, using the client JSON's `media` section to match identifiers to filenames.

### 16.3 Media checklist (example format)

```
ARDHAS MEDIA CHECKLIST
Project: aswin-weds-anisree
Template: Ivory Vows (wedding-1)
Generated: 2026-10-15

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] HERO_IMAGE.jpg        — REQUIRED
    Main welcome photograph.
    Recommended: landscape, min 1400×900 px, JPG.

[ ] GALLERY_IMAGE_01.jpg  — Optional
    First gallery photograph.

[ ] GALLERY_IMAGE_02.jpg  — Optional
    Second gallery photograph.

[ ] GALLERY_IMAGE_03.jpg  — Optional
    Third gallery photograph.

[ ] VIDEO_POSTER.jpg      — Optional
    Cover image for the video player.

[ ] WEDDING_VIDEO         — Optional
    Provide a YouTube link or an MP4 file.
    If sending a file: WEDDING_VIDEO.mp4
    If sending a YouTube link: enter it in the JSON.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

How to send your files:
- Name each file as shown above (e.g., HERO_IMAGE.jpg).
- Send all files to Ardhas via WhatsApp or Google Drive.
- Mention the project name: aswin-weds-anisree.

Original files are preferred. Ardhas will optimize them for web delivery.
```

---

## 17. PDF and Export Workflow

### 17.1 Current PDF status

**How it works now:** The "Save PDF" button in the preview toolbar and the "Save invitation PDF" button in the invitation toolbar both call `window.print()`. This opens the browser's native print dialog, from which the user can save a PDF.

**Known limitations:**
- The user must manually enable "Background graphics" in the print dialog for the full design to appear.
- Pagination is handled entirely by the browser and may produce awkward page breaks within sections.
- Videos appear as a static poster image or are omitted from the PDF.
- The PDF visual quality has not been formally tested. `VERIFICATION.md` states: "final PDF pagination has not been visually inspected."
- The approach works acceptably as a "save a copy" feature but does not produce a polished multi-page booklet format.

### 17.2 The three output types

| Output | Description | How generated |
|---|---|---|
| Browser preview | The interactive React application in the browser | Runs live; data in React context |
| Downloadable PDF | A snapshot of the browser layout via the print dialog | `window.print()` |
| Final published invitation | A deployed static build from the generation script | Script + static hosting |

> [!IMPORTANT]
> The browser preview is **not** the same as the final published invitation. The browser preview uses demo data unless the client has customized it. The final invitation is built from the client's JSON file by the generation script and deployed to a hosting service. Clients must understand that what they see in the preview is representative, not final.

### 17.3 Desired client handoff package

After the client has entered their details and before submitting media, they should be able to download:

1. **`client-details.json`** — The structured data file containing all entered information.
2. **`media-checklist.txt`** — A plain-text list of all required and optional media slots.
3. **`invitation-preview.pdf`** — A PDF snapshot of the customized invitation (via print dialog).

The media files themselves must be sent separately.

### 17.4 JSON export implementation plan

The JSON export button should:
1. Collect the current `config` object from React context.
2. Transform it into the client JSON schema (Section 15).
3. Strip any Base64 image data URLs (replace with `null` and a note to send the file separately).
4. Add metadata: `schema`, `projectId` (entered by the client or auto-generated), `generatedAt`, `publication.status: "draft"`.
5. Serialize as a pretty-printed JSON string.
6. Trigger a browser download using the `Blob` API and a dynamically created anchor element.

This is a client-side-only operation requiring no backend.

---

## 18. Client Media Submission Workflow

### 18.1 What the client must send

After completing the customizer and downloading the handoff package, the client must send their original photographs and video to Ardhas. The reasons original files are needed:

1. Files uploaded in the browser are low-resolution previews and are not transferred anywhere.
2. The founder needs to optimize images for web delivery (compress, resize, convert to WebP).
3. Losslessly compressed originals allow better optimization than compressed previews.
4. The generation script needs local file access to embed images in the invitation build.

### 18.2 Transfer methods

The following transfer methods are acceptable:

| Method | Notes |
|---|---|
| WhatsApp | Convenient for the client but compresses images. Ask for "Document" send mode, not "Photo", to avoid WhatsApp's compression. |
| Google Drive | Preferred for large files and multiple images. Client shares a folder with a Ardhas-provided Google account. |
| WeTransfer | Good for one-time large transfers. Files expire after 7 days unless a paid account is used. |
| OneDrive / Dropbox | Acceptable alternatives. |

For video files, WhatsApp Video mode is not suitable — it compresses aggressively. The client must use Google Drive, WeTransfer, or a YouTube upload (unlisted).

### 18.3 Matching files to media slots

When files arrive, the founder must:

1. Open the client's project folder at `clients/{projectId}/`.
2. Verify the client's `client-details.json` for the list of expected media slots.
3. Rename each received file to match its media slot identifier (e.g., rename `DSC_0412.jpg` to `HERO_IMAGE.jpg`).
4. Place the renamed files in `clients/{projectId}/media/`.
5. Run the generation script, which reads the media identifiers from the JSON and matches them to files.

### 18.4 Disclaimer about browser uploads

The current application allows images to be "uploaded" in the browser for preview purposes. The hint text states: "Images stay in this session." However, clients may not read this carefully.

> [!WARNING]
> The current application must not imply that uploading an image in the browser transmits it to Ardhas. The media checklist must clearly state that original files must be sent separately. Do not add any language that suggests browser uploads are a delivery mechanism.

---

## 19. Custom-Template Workflow

### Type B clients: custom designs

Some clients provide reference materials (e.g., a design from Instagram, a Pinterest board, a physical card) that do not match any existing Ardhas template.

**Step-by-step workflow:**

1. The client shares reference materials with the founder via WhatsApp or email.
2. The founder reviews the design requirements and estimates the effort.
3. The founder communicates a timeline and any additional cost for custom work.
4. The founder creates a new template component in `src/templates/`. This could be:
   - A new JSX component built from scratch.
   - A copy of an existing template with significant CSS modifications.
   - A heavily customized CSS variation of the `Welcome.jsx` base.
5. The new template is registered in `src/templates/Invitation.jsx` with a new style key.
6. If the template is likely to be reused for future clients, it may be added to `src/data/events.js` as a named design. If it is client-specific, it is stored in `src/templates/custom/` and referenced only in that client's JSON.
7. The client details and media are collected using the same JSON schema.
8. The generation script is used for the rest of the workflow as normal.

**Design ownership:**

The founder must confirm before reusing a client-inspired custom design for other clients. If the client's brief is based on a third-party design (e.g., a template purchased from another service), Ardhas must respect the original design's licensing. Do not reuse designs without explicit permission from the client or the original designer.

---

## 20. Folder Structure and File Responsibilities

### 20.1 Proposed full directory layout

```
D:\ardhas-invitations\
├── .github\
│   └── workflows\
│       └── deploy-pages.yml          # GitHub Actions deploy pipeline (exists)
├── public\                           # Static assets copied verbatim to dist/
│   ├── 404.html                      # GitHub Pages SPA routing workaround (exists)
│   ├── favicon.svg                   # Brand favicon (exists)
│   ├── housewarming-home.jpg         # Housewarming hero image (exists)
│   └── robots.txt                    # Search engine crawl rules (exists)
├── src\                              # React application source (exists)
│   ├── App.jsx                       # Route definitions (exists)
│   ├── main.jsx                      # Application entry point (exists)
│   ├── assets\                       # SVG and static assets referenced in JSX (exists)
│   ├── components\                   # Shared UI components (exists)
│   ├── context\                      # React state management (exists)
│   ├── data\                         # Event definitions, template data (exists)
│   ├── hooks\                        # Custom React hooks (exists)
│   ├── pages\                        # Top-level route components (exists)
│   ├── sections\                     # Shared invitation section components (exists)
│   ├── styles\                       # CSS stylesheets (exists)
│   └── templates\                    # Invitation template components (exists)
├── clients\                          # [TO CREATE] Per-client project folders
│   └── aswin-weds-anisree\           # Example project folder
│       ├── client-details.json       # Full client data in the Ardhas schema
│       ├── media-checklist.txt       # Printed checklist of required media
│       ├── media\                    # Original client files (received, not web-optimized)
│       │   ├── HERO_IMAGE.jpg
│       │   ├── GALLERY_IMAGE_01.jpg
│       │   ├── GALLERY_IMAGE_02.jpg
│       │   └── WEDDING_VIDEO.mp4
│       ├── media-optimized\          # Web-optimized versions of the above
│       │   ├── HERO_IMAGE.webp
│       │   ├── GALLERY_IMAGE_01.webp
│       │   └── GALLERY_IMAGE_02.webp
│       ├── generated\                # Output from the generation script
│       │   └── dist\                 # Built static site ready to deploy
│       ├── invitation-preview.pdf    # PDF snapshot (client reference only)
│       └── qr-code.png              # QR code after publication
├── scripts\                          # [TO CREATE] Local automation scripts
│   ├── create-project.js             # Create a new client folder with template JSON
│   ├── generate-invitation.js        # Main generation script
│   ├── validate-client.js            # JSON and media validation
│   ├── generate-qr.js               # QR code generation after publication
│   └── optimize-media.js            # Image resizing and WebP conversion
├── spreadsheet\                      # [TO CREATE] Internal tracking
│   └── client-tracker.xlsx           # Client project spreadsheet
├── dist\                             # [Generated] Production build (gitignored)
├── node_modules\                     # [Generated] Dependencies (gitignored)
├── index.html                        # HTML entry point for the SPA (exists)
├── vite.config.js                    # Vite configuration (exists)
├── package.json                      # Project metadata and scripts (exists)
├── .gitignore                        # Specifies files Git should ignore (exists)
├── README.md                         # Public-facing project description (exists)
├── VERIFICATION.md                   # Recorded test results (exists)
└── ARDHAS_MASTER_PLAN.md             # This document (exists)
```

### 20.2 Purpose of each directory

| Directory/File | Purpose |
|---|---|
| `src/` | React application source. Contains the website, customizer, and all template components. This is what gets compiled into `dist/`. |
| `public/` | Files that are copied as-is into `dist/`. Accessible at the root URL. |
| `clients/` | Private client project folders. **Never commit to Git.** Never include in `dist/`. |
| `clients/{id}/media/` | Original received files from the client. Full resolution. |
| `clients/{id}/media-optimized/` | Web-optimized copies (compressed, resized, WebP). These are the files actually used in the invitation build. |
| `clients/{id}/generated/dist/` | The output of the generation script for this client. The contents of this folder are deployed to the hosting service. |
| `scripts/` | Node.js scripts for the local workflow. These run on the founder's computer, not on a server. |
| `spreadsheet/` | The internal client tracking spreadsheet. Not committed to Git. |
| `dist/` | The production build of the public Ardhas website (the demo/portfolio). Generated by `npm run build`. Gitignored. Deployed by GitHub Actions. |

### 20.3 Gitignore rules

The current `.gitignore` contains:
```
node_modules
dist
*.log
.DS_Store
```

**Additional rules needed:**

```gitignore
# Client data and private media — NEVER commit
clients/
spreadsheet/

# Scratch and temporary files
*.tmp
```

> [!CAUTION]
> Before committing any files, check that no client folder or spreadsheet has been accidentally staged. Consider adding a pre-commit hook to detect and reject accidental staging of `clients/` contents.

### 20.4 Project identifier conventions

- Use a descriptive, URL-safe slug: `{firstname}-weds-{firstname}` for weddings, or `{family}-housewarming` for housewarmings.
- Use lowercase letters, hyphens only (no spaces, underscores, or special characters).
- Keep it stable — do not rename a project folder after creating it, as the slug may be part of the published URL.
- Examples: `aswin-weds-anisree`, `meera-baby-shower-2026`, `nair-family-housewarming`

---

## 21. Client-Tracking Spreadsheet

Maintain a spreadsheet at `spreadsheet/client-tracker.xlsx` as an internal operational record.

### Proposed columns

| Column | Description |
|---|---|
| Project ID | The slug identifier (e.g., `aswin-weds-anisree`) |
| Event Type | Wedding, Housewarming, etc. |
| Client Name | Name of the primary contact |
| Event Date | The date of the event |
| Template | Template ID (e.g., `wedding-1`) |
| Custom Design? | Yes/No |
| Referral Source | Who referred this client (e.g., photographer name) |
| Details Received | Date the JSON/details were received |
| Photos Received | Date the original photos were received |
| Videos Received | Date the video files were received |
| Media Complete? | Yes/No — all required media slots filled |
| Proof Shared | Date the invitation preview was shared for review |
| Client Approved | Date the client confirmed approval |
| Payment Status | Pending / Received / Waived |
| Published URL | The final invitation URL |
| QR Code Generated | Yes/No |
| Delivered | Date the URL, QR code, and PDF were sent to the client |
| Notes | Any special instructions or issues |

> [!NOTE]
> The spreadsheet tracks operational status. It does not need to duplicate the full invitation content — that lives in `client-details.json`. Keep the spreadsheet lightweight.

---

## 22. Generation Script Design

### 22.1 Overview

The generation script is a Node.js script that the founder runs locally to produce a client-specific invitation build. It is not a server; it runs on the founder's computer.

**Conceptual command:**

```powershell
node scripts/generate-invitation.js --project aswin-weds-anisree
```

### 22.2 Proposed workflow steps

```
1. Accept project ID as a command-line argument
2. Locate the client folder: clients/{projectId}/
3. Load client-details.json
4. Validate the JSON schema version
5. Validate all required fields are present and non-empty
6. Identify the selected template ID from the JSON
7. Validate the template ID exists in the application data
8. Read the template's required and optional media slots
9. Check that each required media slot has a corresponding file
   in clients/{projectId}/media-optimized/
10. Check that each optional media slot has a file or is intentionally absent
11. Warn about any media identifiers in the JSON that do not match
    any template slot
12. Copy the client's optimized media files to a working directory
    inside the client's generated/ folder
13. Build the invitation using Vite with custom environment variables
    that inject the client JSON as build-time data
14. Alternatively, write the client JSON to a known import path
    and import it in the template component at build time
15. Place the final build at clients/{projectId}/generated/dist/
16. Verify that the expected output files exist
17. Report a summary: files created, warnings, errors
18. If all checks pass, offer to deploy or provide deployment instructions
```

### 22.3 Technical approach for data injection

**Option A: Environment variables (simple, limited)**

Pass client data as environment variables. Limitation: environment variables are strings, so complex nested JSON structures become cumbersome.

**Option B: Generated config file (recommended for initial implementation)**

Before running `vite build`, the script writes the client JSON to a known path (e.g., `src/client-config.js`). The invitation components import from this path. After the build, the generated file is deleted from the source tree.

```javascript
// Generated file: src/client-config.js
export const clientConfig = { ... };
```

The template components check for this import and, if found, override the default demo config.

**Option C: Custom Vite plugin**

A custom Vite plugin reads the client JSON at build time and makes it available as a virtual module. More sophisticated but requires deeper Vite knowledge.

> [!NOTE]
> The exact implementation approach must be decided during Phase 4. Document the chosen approach and update this section when the decision is made. Do not implement without first confirming the approach is compatible with the existing Vite/React setup.

### 22.4 Media handling in the generation script

For each media slot:
1. Check `clients/{projectId}/media-optimized/` for the file named `{SLOT_ID}.webp` (or `.jpg`).
2. If found, copy the file to `clients/{projectId}/generated/src/assets/media/`.
3. Replace the default Unsplash URL in the client JSON with a relative path pointing to the copied file.
4. The Vite build will then bundle the local file.

For video URLs (YouTube links or remote MP4s), no file copy is needed — the URL is used directly.

### 22.5 Error handling and reporting

The script must:
- Print a clear description of every validation failure.
- List all missing required fields.
- List all missing required media files.
- Never continue past a required-field error.
- On optional missing fields: print a warning but continue.
- At the end: print a summary of the build status.

Example output:
```
Ardhas Invitation Generator
Project: aswin-weds-anisree
Template: wedding-1 (Ivory Vows)

✓ JSON loaded and schema validated
✓ All required fields present
⚠ Optional slot GALLERY_IMAGE_04 not found — skipped
⚠ Optional slot GALLERY_IMAGE_05 not found — skipped
✓ Optimized media: 5 of 5 required files found
✓ Build started…
✓ Build complete: clients/aswin-weds-anisree/generated/dist/

Next steps:
  1. Preview locally: npx serve clients/aswin-weds-anisree/generated/dist
  2. Deploy to hosting service
  3. Verify the published URL
  4. Generate QR code: node scripts/generate-qr.js --project aswin-weds-anisree --url https://ardhas.in/invite/aswin-weds-anisree
```

---

## 23. Unique URL and Publication Design

### 23.1 The core problem

The existing application has one `/preview` route that shows whichever template is currently in the React context. All visitors share this demo state. A real client invitation requires a **stable, unique URL** that:

- Returns that client's invitation every time, for any guest.
- Does not require the visitor to customize anything.
- Works after the founder's computer is off.
- Cannot be confused with another client's invitation.

### 23.2 Options for unique URLs

#### Option A: Per-client static builds (recommended for initial phase)

Each client gets their own complete static build, deployed to a separate path or folder on the hosting service.

Example: `https://ardhas.in/invite/aswin-weds-anisree/`

The contents of `clients/{projectId}/generated/dist/` are deployed to the hosting service under this path. No shared application server is needed.

**Advantages:**
- Simple to implement.
- Each build is completely independent.
- Easy to update: re-run the generation script and redeploy.
- Works with any static hosting service.
- No risk of data from one client appearing in another's invitation.

**Disadvantages:**
- Multiple deployment operations (one per client).
- A CDN or hosting service must support serving multiple independent static apps under the same domain.
- If the Ardhas website itself is updated, each client's invitation would need to be rebuilt or kept on the version it was built with.

#### Option B: Single SPA with dynamic routing

The Ardhas application includes routes like `/invite/:projectId`. When a route is matched, the app loads the corresponding client JSON from a remote storage location (e.g., an S3 bucket or a CDN-hosted JSON file). This approach requires the client JSON and media to be publicly accessible at a known URL.

**Advantages:**
- Single codebase and single deployment.
- Client invitations appear at predictable URLs automatically.

**Disadvantages:**
- Requires a remote storage location for client JSON files and media.
- Client JSON files (with personal details) must be publicly accessible, raising privacy considerations.
- Open Graph metadata is rendered client-side, which means WhatsApp previews will show generic content (see Section 26).
- More complex infrastructure than Option A.

#### Option C: Server-Side Rendering (SSR)

A server generates a complete HTML document for each invitation on request. This solves the Open Graph metadata problem but requires a running server.

**Disadvantages:**
- Requires a server (not just static hosting).
- More expensive and complex to maintain.
- Not needed in the initial phase.

> [!NOTE]
> **Recommendation for the initial phase:** Use Option A (per-client static builds). It is the simplest approach and eliminates most infrastructure concerns. Revisit Option B or C if the business scales to a volume where managing individual builds becomes impractical.

### 23.3 Preventing one client's content from appearing in another's

With per-client static builds (Option A), there is no risk of content mixing — each build is completely independent.

With the single-SPA approach (Option B), the application must:
- Load client data only when the correct route is matched.
- Never display data from a different client's request.
- Return a graceful "invitation not found" page for unknown routes.

### 23.4 Updating an invitation after publication

After the URL has been delivered to the client and guests have started sharing it, updates should be handled carefully:

1. Make the necessary changes to the client JSON or media.
2. Re-run the generation script to produce a new build.
3. Redeploy to the same path on the hosting service.
4. Verify the live URL shows the updated content.
5. The URL and QR code remain valid (they point to the same path).

> [!NOTE]
> Never change the published URL after delivery unless absolutely necessary. If the URL must change, ensure all previous links redirect to the new URL, and provide the client with updated QR codes.

---

## 24. Hosting and Storage Options

### 24.1 The existing situation

The current Ardhas portfolio/demo site is hosted on **GitHub Pages** at `https://ardhaseinvites.github.io/ardhas-invitations/`. This is suitable for the portfolio/demo. It is free but has the following constraints:

- The URL path is fixed to `/ardhas-invitations/` (the repository name).
- A custom domain can be configured in the repository settings.
- Only one static site can be deployed per repository (the demo site itself).
- GitHub Pages is not well-suited to hosting multiple per-client invitation builds under the same domain with custom URL paths.

### 24.2 Hosting option comparison

| Option | Use Case | Cost | Custom Domain | Multiple Sites | Video | Notes |
|---|---|---|---|---|---|---|
| GitHub Pages | Portfolio/demo | Free | Yes (with CNAME) | No (one per repo) | No native hosting | Good for the demo site; not for per-client builds |
| Netlify | Static hosting | Free tier + pay for extras | Yes | Yes (multiple deploys) | No native hosting | Good for per-client builds via Netlify CLI or API |
| Vercel | Static hosting | Free tier + pay for extras | Yes | Yes | No native hosting | Similar to Netlify; good developer experience |
| Amazon S3 + CloudFront | Static files + CDN | Pay-per-use | Yes | Yes | Yes (direct file hosting) | Most flexible; good for large media; slightly more setup |
| Cloudflare Pages | Static hosting | Free tier + pay for extras | Yes | Yes | No native hosting | Fast CDN; good free tier |

### 24.3 Static hosting vs. media storage

These are two different concerns:

- **Static hosting:** Serves the HTML, CSS, JavaScript, and small assets (e.g., optimized images) that make up the invitation web page.
- **Media storage:** Stores large files (original photos, videos) that may be too large to include in the static build.

For the initial phase, including optimized images directly in the static build is acceptable. A video stored on YouTube does not require a separate storage service — it is streamed directly from YouTube's servers.

If video files need to be hosted by Ardhas (not YouTube), a storage service such as Amazon S3 or Cloudflare R2 is needed.

### 24.4 Recommendation

**Initial phase:**

- Keep the portfolio/demo on GitHub Pages.
- Use **Netlify** (or Cloudflare Pages) to host per-client invitation builds. Both have generous free tiers, command-line deployment tools, custom domain support, and HTTPS by default.
- Videos should be provided as YouTube links or Vimeo links to avoid hosting large video files.
- When a custom domain is purchased, configure it to point to the hosting service.

**Later phase (if media storage becomes necessary):**

- Evaluate Amazon S3 (with CloudFront for CDN and HTTPS) or Cloudflare R2.
- Keep original files on the founder's computer; only publish optimized copies.

---

## 25. Domain and HTTPS Requirements

### 25.1 Domain

A custom domain such as `ardhas.in` is the intended destination. As of this writing:

- The domain has **not been purchased**.
- The domain registrar, DNS provider, and hosting configuration have not been decided.
- The domain must be purchased before it can be configured with a hosting service.

**Recommended approach:**
1. Purchase the domain through a registrar (e.g., GoDaddy, Namecheap, Google Domains/Squarespace Domains).
2. Configure the DNS to point to the chosen hosting service (Netlify, Cloudflare Pages, etc.).
3. The hosting service will provide HTTPS automatically through Let's Encrypt or a similar service.

**URL structure for invitations:**

Once the domain is configured, invitation URLs would be:

```
https://ardhas.in/invite/aswin-weds-anisree/
```

This structure requires either:
- Hosting each invitation as a separate deployment under that path, or
- A routing layer that serves the correct files for each path.

### 25.2 HTTPS

HTTPS is non-negotiable. It ensures:
- Browser security warnings are not shown to guests.
- WhatsApp link previews work correctly (WhatsApp refuses to preview non-HTTPS pages).
- The invitation appears trustworthy to guests.

All recommended hosting services (Netlify, Cloudflare Pages, GitHub Pages with a custom domain) provide HTTPS automatically.

---

## 26. WhatsApp Previews and QR Codes

### 26.1 How WhatsApp link previews work

When a WhatsApp user receives a link, WhatsApp's servers make a request to that URL to fetch a link preview. This preview includes:
- A title (from `<meta property="og:title">` or `<title>`)
- A description (from `<meta property="og:description">` or `<meta name="description">`)
- An image (from `<meta property="og:image">`)

WhatsApp's crawler does not execute JavaScript. It reads only the raw HTML that is served at the URL.

### 26.2 The current limitation

The current application uses React Helmet to set the `<title>` and `<meta name="description">` dynamically in JavaScript. The raw `index.html` contains a generic title and description. When WhatsApp fetches the invitation URL, it receives the generic title "Ardhas — Invitations, beautifully reimagined" and no image, not the client-specific names and photo.

Additionally, no `<meta property="og:*">` tags are currently set anywhere in the application.

### 26.3 How to fix this

For real client invitations, the static HTML served at the invitation URL must contain the correct Open Graph metadata **before** JavaScript executes.

**Approach for per-client static builds (Option A from Section 23):**

During the generation script, after the Vite build produces `index.html`, post-process the file to inject the client-specific metadata:

```html
<title>Nikhil & Anjali · Wedding Invitation</title>
<meta property="og:title" content="Nikhil & Anjali · Wedding Invitation" />
<meta property="og:description" content="Joyfully invite you to celebrate our wedding on 14 December 2026, The Leela Ashtamudi, Kollam." />
<meta property="og:image" content="https://ardhas.in/invite/aswin-weds-anisree/hero.jpg" />
<meta property="og:url" content="https://ardhas.in/invite/aswin-weds-anisree/" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

The `og:image` must point to a publicly accessible URL (the hero image as deployed).

**Test WhatsApp previews before delivering to the client:**

Use the WhatsApp link preview by sending the link in a WhatsApp chat and checking the preview. Also use the Facebook Open Graph Debugger (developers.facebook.com/tools/debug) to inspect what metadata crawlers see.

### 26.4 QR codes

A QR code is generated after the final public URL is confirmed.

**Generation approach:**

A local Node.js script using a library such as `qrcode` (npm package) generates a PNG image containing the URL.

```
node scripts/generate-qr.js --project aswin-weds-anisree --url https://ardhas.in/invite/aswin-weds-anisree
```

The QR code is saved at `clients/{projectId}/qr-code.png`.

**Important:**
- Generate the QR code only after the final URL is confirmed. If the URL changes, the QR code must be regenerated.
- A stable redirect URL (e.g., via a URL shortener or Ardhas's own redirect service) could allow updating the destination without regenerating QR codes — but this adds complexity and is not required initially.
- Deliver the QR code as a high-resolution PNG (at least 500×500 px) so the client can print it on physical cards or stationery.

---

## 27. Image and Video Optimization

### 27.1 Why optimization matters

Wedding photographs from a professional photographer can be 10–30 MB per file. Serving unoptimized originals would make the invitation slow to load on mobile networks, especially in rural Kerala where 4G speeds can be variable.

### 27.2 Image optimization guidelines

| Source format | Target format | Max width | Max file size | Quality |
|---|---|---|---|---|
| Hero image (original) | WebP | 1400 px | ~150 KB | 80% |
| Gallery images (originals) | WebP | 1200 px | ~100 KB each | 80% |
| Video poster image | WebP | 1200 px | ~80 KB | 75% |
| Background image | WebP | 1400 px | ~100 KB | 75% |

**Recommended tools for local image optimization:**

- `sharp` — a fast Node.js library for image resizing and format conversion. The `optimize-media.js` script should use this.
- `cwebp` — Google's WebP converter CLI tool.
- `squoosh-cli` — Google's image compression CLI (produces excellent results).

**Process:**
1. Receive the original file from the client (e.g., `DSC_0412.jpg`, 24 MB).
2. Rename to the media slot identifier: `HERO_IMAGE.jpg`.
3. Place in `clients/{projectId}/media/`.
4. Run the optimize script: produces `clients/{projectId}/media-optimized/HERO_IMAGE.webp`.
5. The generation script uses the optimized file, not the original.

### 27.3 Video handling

Videos should not be embedded as locally hosted files in the initial phase due to:
- Large file sizes (100 MB+ for typical wedding videos)
- Bandwidth costs on a static hosting service
- Mobile data concerns for guests

**Recommended approach:**

1. The client uploads their video to YouTube as an **unlisted** video.
2. The YouTube URL is added to the invitation JSON.
3. The invitation embeds the video using a YouTube iframe (already supported).

If the client cannot use YouTube, an MP4 URL from another hosting service (e.g., a Cloudflare Stream link, a Vimeo link, or a direct S3 URL) can be provided instead.

### 27.4 Video in PDFs

Videos cannot be played in a PDF. When the invitation is printed as a PDF, the video section renders as:
- The video poster image (if provided), or
- The play button overlay, or
- Nothing (if no poster is set)

The PDF is understood by all parties to be a supplementary printable snapshot, not a replacement for the digital invitation.

---

## 28. Privacy and Security

### 28.1 Client data principles

| Rule | Details |
|---|---|
| No client data in Git | The `clients/` directory must be in `.gitignore`. Never commit real client names, phone numbers, email addresses, or photos to the Git repository. |
| No client data in the public `dist/` | The Vite build outputs only the Ardhas portfolio site. Client invitation builds are stored separately in `clients/{id}/generated/dist/`. |
| Minimise data collection | Collect only the information needed to create and deliver the invitation. |
| Secure transfer | Use HTTPS for all file transfers. Do not send sensitive client data via plain email without encryption. |
| Retention policy | Decide how long to keep original client files after delivery. Communicate this to the client. Consider deleting originals after 3–6 months. |
| Permission before reuse | Do not use a client's photographs or a client-inspired design in public portfolio materials without explicit written permission. |
| Invitation visibility | Published invitations at their URLs are accessible to anyone who has the link. This is intentional — the invitation is meant to be shared. Do not represent a URL-guarded page as access-controlled unless additional protection is implemented. |

### 28.2 The published invitation

A published invitation is a **public web page**. Anyone with the URL can view it. This is the expected behavior — the couple wants guests to open it. However:

- The URL should not be posted publicly in any way that might expose it to spam.
- The invitation may contain phone numbers and addresses that guests need. This is intentional.
- Do not include information in the invitation that the client has not explicitly authorized for public sharing.

### 28.3 Upload security (future)

If a file upload service is introduced in the future, it must:
- Validate file types on the server side (not just the browser).
- Limit file sizes.
- Scan for malicious files.
- Store files in a location not directly web-accessible unless deliberately shared.
- Use signed upload URLs to prevent unauthorized uploads.

---

## 29. Error Handling and Validation

### 29.1 Client data validation

**At JSON export time (browser):**
- Warn the client if the event date is in the past.
- Warn if required fields (names, date, venue) are empty.
- Strip Base64 image data from the export; replace with a placeholder note.

**At generation time (script):**
- Check `schema` version; halt if unrecognized.
- Validate all required fields are present.
- Check all required media files exist in `media-optimized/`.
- Warn about optional missing files.
- Warn about extra files that don't match any slot.
- Validate that the template ID is registered in the application.
- Validate date format (ISO 8601).
- Validate time format (HH:mm).

### 29.2 Media validation

| Check | Action |
|---|---|
| File not found | Required: halt with error. Optional: warn and skip. |
| File format not accepted | Halt and report the expected format. |
| File is corrupt (cannot be read) | Halt and report. |
| File is too large (>10 MB after optimization) | Warn; may produce a slow invitation. |
| Image dimensions too small | Warn; the image may appear blurry. |
| Video URL is not accessible | Warn; the video section will not work. |

### 29.3 Publication validation

Before delivering the URL to the client:

- [ ] Open the invitation in Chrome on a mobile viewport.
- [ ] Verify all sections display correctly.
- [ ] Verify all names, dates, and text are correct.
- [ ] Verify all images load.
- [ ] Verify the video plays (if applicable).
- [ ] Verify the countdown timer shows the correct date.
- [ ] Verify the map link opens the correct location.
- [ ] Verify the phone numbers in the contacts section are clickable.
- [ ] Test the WhatsApp link preview by sharing in a test chat.
- [ ] Verify HTTPS is working.
- [ ] Verify the QR code opens the correct URL.

---

## 30. Testing Strategy

### 30.1 Existing automated tests

| Test file | Tests | Status |
|---|---|---|
| `src/context/invitationState.test.js` | 4 tests: event count, draft isolation, template application, reset scope, invalid IDs | Passing (verified in CI) |
| `src/pages/Housewarming.test.js` | jsdom integration test for housewarming features | Passing (verified in CI) |

Run with: `npm test`

### 30.2 Testing checklist

| # | What is being tested | Expected result | Current status |
|---|---|---|---|
| T01 | `npm install` completes without errors | All dependencies installed | Installed (node_modules exists) |
| T02 | `npm run dev` starts the dev server | App available at http://127.0.0.1:5173 | Not tested in this audit |
| T03 | `npm run build` completes without errors | `dist/` is generated | Passes (dist/ exists) |
| T04 | `npm run preview` serves the production build | App available at the preview URL | Not tested in this audit |
| T05 | `npm test` passes all automated tests | All tests pass | Passes (verified by CI badge and VERIFICATION.md) |
| T06 | Homepage loads and shows all 12 event type filters | Filter buttons visible; template grid shows 3 cards per event | Verified (VERIFICATION.md) |
| T07 | Clicking a template card opens the customizer with that template selected | Customizer loads with correct event type and template pre-selected | Verified (VERIFICATION.md) |
| T08 | Editing the "Names" field updates the live preview in real time | Preview hero shows new name | Verified (VERIFICATION.md) |
| T09 | Switching from Wedding to Birthday preserves the Wedding draft | After switching back, Wedding names are unchanged | Verified (automated test + VERIFICATION.md) |
| T10 | Uploading a JPG in the customizer replaces the hero image | Preview shows the uploaded photo | Verified (VERIFICATION.md) |
| T11 | A PNG file larger than 5 MB is rejected | Error message is shown | Not tested in this audit |
| T12 | A non-image file (e.g., .pdf) is rejected | Error message "Choose a JPG, PNG, WebP or GIF image" | Not tested in this audit |
| T13 | Switching to mobile preview shows narrow layout | Preview frame narrows to approximately 390 px | Verified (VERIFICATION.md) |
| T14 | `/preview` route loads the full invitation | Invitation visible with all sections | Not tested in this audit |
| T15 | "Save PDF" button in the preview toolbar opens the print dialog | Browser print dialog appears | Not tested in this audit |
| T16 | PDF contains background graphics when "Background graphics" is enabled in print dialog | Colors and images appear in the PDF | Not tested in this audit (pagination not inspected) |
| T17 | YouTube video URL plays correctly in the invitation | Video section shows a play button; clicking it starts playback | Not tested in this audit |
| T18 | Invalid YouTube URL (e.g., just "youtube") is handled gracefully | Video section shows a disabled play button | Not tested in this audit |
| T19 | `window.print()` is triggered by the in-invitation "Save invitation PDF" button | Print dialog appears | Not tested in this audit |
| T20 | Toggling a section off hides it in the preview | Section disappears from the preview | Verified (VERIFICATION.md) |
| T21 | Reset button restores the current event's demo defaults | Fields return to default; other event drafts unchanged | Verified (automated test) |
| T22 | WhatsApp URL opens a WhatsApp chat | WhatsApp opens to the correct number | Verified (VERIFICATION.md) |
| T23 | Instagram link opens the Ardhas profile | Instagram profile opens | Verified (VERIFICATION.md) |
| T24 | `/housewarming` route loads the housewarming invitation | Housewarming invitation visible | Verified (VERIFICATION.md) |
| T25 | Housewarming countdown shows the correct elapsed/remaining state | Countdown correctly reflects the Sep 2026 date | Not re-tested (date has passed as of Oct 2026) |
| T26 | Housewarming map link opens the correct GPS coordinates | Google Maps opens at 9.0478°N, 76.6006°E | Verified (VERIFICATION.md) |
| T27 | Direct navigation to `/customizer` works without a 404 | Page loads correctly | Not tested in this audit (depends on hosting) |
| T28 | WhatsApp link preview shows correct invitation title (not generic) | Client's names and event appear in the WhatsApp preview | **Known failure** — not implemented |
| T29 | Open Graph metadata is present and correct in the generated HTML | `og:title`, `og:description`, `og:image` present | **Known failure** — not implemented |
| T30 | QR code opens the correct invitation URL | URL resolves to the correct invitation | Not implemented |
| T31 | Client JSON download contains all entered data | JSON file is complete and valid | Not implemented |
| T32 | Media checklist includes all template slots | All slots listed correctly | Not implemented |
| T33 | Generation script reads client JSON and produces a build | Build is created at the expected path | Not implemented |
| T34 | Generation script halts on missing required fields | Error is printed; no build is created | Not implemented |

> [!NOTE]
> Tests marked "Not tested in this audit" need to be run manually. Tests marked "Known failure" need implementation before they can pass.

---

## 31. Phased Implementation Roadmap

### Phase 0: Audit and stabilize (current phase — partially complete)

- [x] Inspect the repository thoroughly.
- [x] Confirm that 36 designs and 12 event types exist and are correct.
- [x] Confirm automated tests pass.
- [x] Confirm production build exists (`dist/`).
- [x] Confirm GitHub Pages deployment workflow exists and is configured.
- [ ] Run `npm run dev` locally and smoke-test all major features.
- [ ] Test the PDF export in a real browser.
- [ ] Test the YouTube video embedding.
- [ ] Test the image upload flow end to end.
- [ ] Confirm the housewarming page is still working (countdown may show elapsed date).
- [ ] Document any new issues found during manual testing.

**Deliverable:** This master plan document.

### Phase 1: Improve template selection and preview

- [ ] Verify every template deep link works correctly.
- [ ] Test that switching event types and applying templates works on a mobile browser.
- [ ] Confirm the customizer is fully usable on a touch screen.
- [ ] Add groom's full name and bride's full name as separate standard fields.
- [ ] Add parent name fields to the family/contacts section.
- [ ] Add a client/project ID field to the customizer (used in the JSON export).
- [ ] Improve the "Photos & video" section to show clearer media slot labels.
- [ ] Confirm missing fields are handled gracefully in the invitation preview.

### Phase 2: Build the client data collection and export workflow

- [ ] Design the client JSON schema (documented in Section 15).
- [ ] Add a "Download my details" button to the preview page that exports the client JSON.
- [ ] Add a "Download media checklist" button to the preview page.
- [ ] Strip Base64 image data from the JSON export.
- [ ] Improve the PDF export with better print CSS (page breaks, section headings, QR code placeholder).
- [ ] Show a clear message on the preview page explaining that the original media must be sent separately.
- [ ] Add custom field support: an "Add custom field" UI in the customizer.

### Phase 3: Organize client projects locally

- [ ] Create the `clients/` directory structure (not committed to Git).
- [ ] Add `clients/` and `spreadsheet/` to `.gitignore`.
- [ ] Write a `create-project.js` script that creates a new client folder with a blank JSON template.
- [ ] Define file naming conventions for incoming media.
- [ ] Create the `spreadsheet/client-tracker.xlsx` template.
- [ ] Write the media optimization script using `sharp`.
- [ ] Process the first real client's files through this structure.

### Phase 4: Build the invitation generation script

- [ ] Decide on the data injection approach (Section 22.3).
- [ ] Write the `validate-client.js` script.
- [ ] Write the `generate-invitation.js` script.
- [ ] Test the script with a sample client JSON.
- [ ] Verify the generated build looks correct in the browser.
- [ ] Write the `generate-qr.js` script.
- [ ] Document the full generation workflow.

### Phase 5: Hosting and delivery

- [ ] Purchase the Ardhas domain.
- [ ] Choose a hosting service for per-client builds.
- [ ] Set up a test deployment with a sample invitation.
- [ ] Configure the custom domain with HTTPS.
- [ ] Add per-invitation Open Graph metadata injection to the generation script.
- [ ] Test the WhatsApp link preview.
- [ ] Write a deployment step into the generation script or document the manual deployment command.

### Phase 6: Business validation

- [ ] Deliver the first real client invitation using this workflow.
- [ ] Measure the time taken for each step.
- [ ] Ask the client for feedback.
- [ ] Identify the most time-consuming steps.
- [ ] Improve the workflow for those steps.
- [ ] Deliver 3–5 more client invitations using the improved workflow.
- [ ] Confirm the pricing model covers costs and time.

### Phase 7: Future enhancements

See Section 32.

---

## 32. Future Enhancements

The following are not part of the initial requirement. They may become valuable if the business validates demand and scales.

| Enhancement | Benefit | Trigger condition |
|---|---|---|
| Automated media upload via a dedicated upload service | Clients can send files without WhatsApp or Drive | Volume makes manual file collection a bottleneck |
| Malayalam language support for invitation content | Reach culturally appropriate audiences in Kerala | Client demand; a freelance translator or a bilingual version |
| RSVP backend (form submission to email or spreadsheet) | Collect guest responses automatically | Client requests; worth adding before the first large event |
| Optional RSVP via WhatsApp | Simpler than a web form; keeps the workflow familiar | Any client without a formal RSVP requirement |
| Better social sharing: static pre-rendering | Reliable WhatsApp/Facebook previews for client invitations | When incorrect previews become a client complaint |
| Custom domain per invitation (e.g., `nikhil-anjali.in`) | Premium offering; feels more personal | High-value clients; justifies the domain cost |
| Payment integration | Automate the payment step | When manual invoicing becomes a bottleneck |
| Customer dashboard | Allow clients to review their invitation online without contacting the founder | SaaS model; high volume of clients |
| Fully automated generation pipeline | Reduce founder's time per invitation | When volume makes manual generation impractical |
| Additional event types | More variety of invitations | Requests for events not currently covered |
| AI-powered design generation | Create new templates quickly | Advanced future roadmap; not needed now |
| Template marketplace | Allow other designers to contribute templates | Major product evolution; not now |

---

## 33. Decisions Already Made

| Decision | Rationale |
|---|---|
| The operating model is a service, not a SaaS product | Validates demand without building infrastructure that may not be needed |
| The founder generates invitations locally on their own computer | Full control over quality; no server costs; allows manual adjustments |
| The existing React/Vite application is the foundation | Significant work already done; starting over would waste this investment |
| No customer dashboard in the initial version | Not needed when there are a small number of clients handled personally |
| No backend API in the initial version | A static site with local scripts handles the initial workflow |
| No customer login or authentication | Not needed when invitations are public links |
| No full SaaS subscription system | Not needed in the initial service model |
| RSVP is a UI demo in the initial version | Real RSVP requires a backend; not yet justified |
| PDF is browser-print only in the initial version | Acceptable for client review; can be improved later |
| Videos are hosted externally (YouTube) in the initial version | Avoids large file storage costs |
| Client media is delivered manually, not via the app | Simpler and more reliable than a custom upload service |
| Per-client static builds for unique URLs | Simplest approach for the initial scale |
| Use a project slug (not a full name) in public URLs | Slightly more privacy-conscious and URL-safe |
| The clients/ directory is never committed to Git | Protects client privacy |

---

## 34. Decisions Still Open

| Decision | Options | Notes |
|---|---|---|
| Domain name | ardhas.in vs. ardhas.co.in vs. ardhasinvites.com | Must be checked for availability and purchased |
| Hosting service for client builds | Netlify vs. Cloudflare Pages vs. Vercel vs. GitHub Pages (multiple repos) | Evaluate based on pricing and deployment workflow |
| Media storage for video | YouTube only vs. Cloudflare Stream vs. S3 | YouTube is the simplest option for the initial phase |
| Pricing model | Per template vs. per feature vs. time-based | Must be validated with real client feedback |
| Referral fee for the photographer | None vs. a percentage vs. a fixed amount per referral | A business agreement to be made with the photographer |
| Template manifest format | Inline in events.js vs. separate JSON files | Needs to be decided before writing the generation script |
| Data injection approach for generation | Generated config file vs. Vite plugin vs. environment variables | Must be tested against the Vite build setup |
| Image format for delivery | WebP only vs. WebP + JPG fallback | WebP is broadly supported; a fallback is rarely needed in 2026 |
| Retention period for client media | 3 months vs. 6 months vs. indefinite | Needs a policy communicated to clients |
| RSVP solution | Google Forms link vs. custom backend vs. WhatsApp handoff | Depends on client needs and volume |
| Invitation privacy | Public link only vs. password protection | Password protection adds complexity; not needed initially |
| Open Graph image generation | Pre-generated from the hero image vs. manually created vs. automated | Must be decided before the first published invitation |

---

## 35. Risks and Limitations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Client provides low-resolution or incorrectly lit photographs | High | Invitation looks poor | Set clear photo requirements upfront; use checklist |
| Client provides a video that cannot be hosted on YouTube (e.g., privacy concerns) | Medium | Video section cannot be shown | Offer Vimeo unlisted as an alternative; or skip video |
| Client changes details after publication | Medium | URL and QR code remain valid; need to rebuild and redeploy | Set expectations about the cost of post-publication changes |
| Founder has limited time to deliver invitations quickly | High | Missed deadlines; unhappy clients | Accurate time estimates; a clear delivery schedule |
| The photographer moves to a different company or stops referring clients | Medium | Loss of primary acquisition channel | Develop secondary referral sources over time |
| Demand is higher than the founder can handle alone | Low initially | Delayed delivery; quality drops | Hire help or develop tools to increase throughput |
| A publicly hosted invitation is indexed by search engines | Low | Client details appear in search results | Add `robots.txt` with `Disallow: /invite/`; use `noindex` on invitation pages |
| Client data is accidentally committed to the public repository | Low but catastrophic | Privacy breach; reputational damage | Gitignore rules; pre-commit hooks; always double-check before pushing |
| The GitHub Pages demo URL becomes the "official" invitation URL | Low | Permanent dependency on a URL that contains the repository name | Migrate to a custom domain before the first real client invitation |
| React Helmet 6 deprecation | Low | Metadata management may break in future React versions | Consider migrating to `react-helmet-async` or Vite-based static metadata injection |

---

## 36. Acceptance Criteria

The project is ready for the first real paying client when:

- [x] The Ardhas website is live and demonstrates the template gallery.
- [ ] The customizer accurately reflects the fields needed for a real wedding invitation.
- [ ] A client can enter their details and preview a realistic-looking invitation.
- [ ] The client can download a JSON file and a media checklist.
- [ ] The founder can run a generation script to produce a working invitation build.
- [ ] The generated invitation passes all visual checks in a mobile browser.
- [ ] The invitation is published at a stable HTTPS URL.
- [ ] The WhatsApp link preview shows the correct title and image.
- [ ] A QR code is generated and verified.
- [ ] The PDF is acceptable quality when printed from the browser.
- [ ] Client data is not accessible in the public Git repository.
- [ ] Client data is not accidentally included in the public Ardhas demo build.

---

## 37. Glossary of Technical Terms

| Term | Definition |
|---|---|
| **SPA** (Single-Page Application) | A web application that loads a single HTML page and dynamically updates the content using JavaScript. The Ardhas application is an SPA built with React. |
| **React** | A JavaScript library for building user interfaces. Components are reusable pieces of UI that manage their own state. |
| **Vite** | A modern build tool and development server for JavaScript projects. It compiles and bundles the React source code into files that browsers can execute. |
| **Tailwind CSS** | A utility-first CSS framework. Provides pre-defined class names that apply specific styles. Used in this project alongside custom CSS. |
| **React Router** | A library that provides client-side navigation for React applications, enabling routes like `/customizer` and `/preview` without a page reload. |
| **Framer Motion** | A React animation library. Used for page transitions, section reveal animations, and countdown digit animations. |
| **GSAP** (GreenSock Animation Platform) | A JavaScript animation library. Used for the hero parallax effect and entrance animations on the homepage. |
| **Swiper** | A JavaScript library for touch-friendly image sliders and carousels. Used for the gallery slider and guest wishes carousel. |
| **React Helmet** | A library for managing the HTML `<head>` element (page title, meta tags) from within React components. |
| **useReducer** | A React hook for managing complex state using a reducer function. The invitation context uses `useReducer` to manage all customization state. |
| **React Context** | A mechanism for sharing state across the React component tree without passing props at every level. |
| **Lazy loading** | Loading a component or resource only when it is first needed, not at page start. Used for the Customizer, Preview, and Housewarming pages. |
| **GitHub Actions** | GitHub's built-in CI/CD service. Used to automatically run tests and deploy the site to GitHub Pages on every push to `main`. |
| **GitHub Pages** | A free static website hosting service provided by GitHub. |
| **Static hosting** | A hosting service that serves pre-built static files (HTML, CSS, JS, images) without a running server process. |
| **CDN** (Content Delivery Network) | A network of servers distributed globally that serve content from a location close to the user, reducing load times. |
| **Open Graph** | A protocol (using `<meta property="og:*">` tags) for controlling how a web page appears when shared on social media and messaging platforms like WhatsApp and Facebook. |
| **QR code** | A two-dimensional barcode that encodes a URL (or other data). Scanning it with a phone camera opens the URL directly. |
| **Media slot** | A named placeholder in a template that represents a specific image or video location. Each slot has a stable identifier (e.g., `HERO_IMAGE`) used to match files to locations. |
| **Client JSON** | A structured data file (JSON format) that contains all of a client's invitation content, template selection, and media identifiers. |
| **Generation script** | A local Node.js script that reads a client JSON file, validates it, and produces a personalized static invitation build. |
| **Base64 data URL** | A way to encode binary file data (like an image) as a text string so it can be embedded directly in HTML or JavaScript. Used when images are uploaded in the browser. Large and not suitable for storing in JSON exports. |
| **dist/** | The output directory produced by the Vite build. Contains compiled, minified, and optimized HTML, CSS, and JavaScript ready for deployment. |
| **SPA routing fallback** | A mechanism that ensures client-side routes (e.g., `/customizer`) are served correctly when the user navigates directly to the URL, rather than returning a 404. The `public/404.html` file implements this for GitHub Pages. |
| **Slug** | A URL-safe string derived from a name or title. For example, "Nikhil & Anjali Wedding" becomes `aswin-weds-anisree`. |
| **WhatsApp** | A popular messaging application. Many Indian clients will share their invitation via WhatsApp. |
| **WebP** | A modern image format developed by Google that provides significantly smaller file sizes than JPG or PNG at similar quality. |
| **RSVP** | "Répondez s'il vous plaît" — a request for guests to confirm their attendance. |

---

## 38. Immediate Next Steps

These are the first actions to take after this document has been reviewed.

1. **Run the application locally** and smoke-test the major features manually:
   - All 12 event types in the gallery
   - The customizer (all three tabs)
   - Image upload
   - YouTube video preview
   - Print/PDF dialog
   - The housewarming invitation
   - The booking dialog

2. **Confirm the GitHub Pages deployment** is live at `https://ardhaseinvites.github.io/ardhas-invitations/`. Verify that the housewarming route (`/housewarming`) and the customizer (`/customizer`) both load via direct navigation.

3. **Add missing contact fields** to the customizer:
   - Groom's full name
   - Bride's full name
   - Groom's parents' names
   - Bride's parents' names
   These are needed for every real wedding invitation.

4. **Add a client/project ID field** to the customizer so the JSON export includes a project identifier.

5. **Design the JSON export function** — the button and the client-side code to produce a downloadable JSON file from the current context state.

6. **Add Open Graph meta tags** to the invitation preview and housewarming pages (at minimum `og:title`, `og:description`, `og:image`). This unblocks WhatsApp preview testing.

7. **Purchase the Ardhas domain** and evaluate Netlify or Cloudflare Pages as the hosting service for client invitations.

8. **Set up the local client folder structure** as described in Section 20, including adding `clients/` and `spreadsheet/` to `.gitignore`.

9. **Draft the first client intake form** — a simple WhatsApp message or email template that asks the client for all the information listed in Section 13.

10. **Engage the first client** through the photographer referral channel and treat the first delivery as a learning exercise. Document every step and the time it takes.

---

*End of ARDHAS_MASTER_PLAN.md*

*This document should be updated whenever a decision changes, a feature is built, or a test result is recorded. It is the primary reference for the Ardhas invitation project.*

---

## 39. Milestone 1 Verified Progress Notes (2026-10-10)

- **Completed Milestone 1: Client Data Collection and Export**:
  - Implemented client Project ID validation (`^[a-z0-9-]{3,40}$`) with clear UX messaging.
  - Added wedding fields to existing reducer state: groom and bride full names, fathers' and mothers' names, additional family members repeater, and multiple-events repeater defaulting to one "Wedding" ceremony.
  - Implemented custom fields manager with `lower_snake` ID format validation, duplicate detection, and input types (`text`, `longtext`, `date`, `time`, `url`).
  - Created central `src/data/mediaSlots.js` defining unique media slots across all templates (`HERO_IMAGE`, `HERO_VIDEO`, `VIDEO_POSTER`, `WEDDING_VIDEO`, `BACKGROUND_IMAGE`, `GALLERY_IMAGE_01`...); each slot defines type, required flag, location, and recommended aspect ratio.
  - Added local video file preview via `URL.createObjectURL` and automatic revocation, with type (`video/mp4`, `video/webm`) and 50 MB size limits.
  - Added "Download client details (JSON)" exporting versioned schema (`ardhas-client/1.0`), stripping all Base64 and local video blobs while preserving remote URLs.
  - Added "Download media checklist" (`.txt`) dynamically generated for the selected template with expected filenames (`<project-id>_<SLOT_ID>.<ext>`) and delivery instructions.
  - Added "Download my images" converting local preview photos to pre-named files with slot IDs.
  - Added print-only "Ardhas Order Sheet" inside invitations (`display: none` on screen, visible during `window.print()`).
  - Added `docs/client-details.schema.json`.
  - Added automated test suite (`src/utils/clientExport.test.js`) verifying all new functionality; 16 tests passing in CI test runner (`npm test`) and production build passing (`npm run build`).


