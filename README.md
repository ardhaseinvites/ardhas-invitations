# Ardhas · Invitations, beautifully reimagined

A premium, responsive invitation website showcase and live design studio. React frontend only, with no backend, authentication, or personal-data submissions.

## AI & System Documentation

- [AGENTS.md](AGENTS.md) — Comprehensive AI agent reference, system invariants, and playbooks.
- [llms.txt](llms.txt) — High-signal repository index adhering to the [llms.txt](https://llmstxt.org) standard.
- [llms-full.txt](llms-full.txt) — Complete single-file context document for LLM ingestion.
- [docs/AI_ARCHITECTURE.md](docs/AI_ARCHITECTURE.md) — Architectural diagrams, state machine, and data dictionaries.

## Run locally

Requires Node.js 22.12+ or 24+ and npm.

```powershell
cd "$env:USERPROFILE\Desktop\aurelle-invitations"
npm install
npm run dev
```

Open http://127.0.0.1:5173. Dependencies are already installed in this copy.

```powershell
npm run build
npm run preview
```

The production files are generated in `dist/`. Deploy to a static host with an SPA fallback to `index.html` for `/preview` and `/customizer`. Vite deployment reference: https://vite.dev/guide/static-deploy.

The repository includes a GitHub Pages workflow. Pushing `main` builds and publishes the site at `https://ardhaseinvites.github.io/ardhas-invitations/`. Direct invitation, housewarming, and customizer URLs recover through `public/404.html`.

## Housewarming experience

Open `/housewarming` (or choose Housewarming in the main navigation). This dedicated experience preserves the existing invitation platform and customizer.

- House: Vazhappalli Thekkathil. Family: Vazhapplli thekkathil.
- Ceremony: 20 September 2026, 10:00 AM IST. Address: Sasthamcotta, Kollam, Kerala. Map pin: 9.0478333333, 76.6006944444.
- Event details, suggested programme, gallery references, and contact links live in `src/data/housewarming.js`. Only the ceremony start time was supplied; the subsequent programme times are marked as suggestions.
- The entrance opens through a GSAP doorway transition. The invitation includes section navigation, countdown with an elapsed-date state, family and story sections, zoomable gallery, click-to-load map, blessings, and a WhatsApp RSVP handoff.
- Lazy-loaded games include a solvable 3×3 swap puzzle, timer and move count, tap/keyboard alternatives to drag-and-drop, house decoration, PNG export, a sound-controlled bell, and a lamp interaction.
- RSVP responses are not saved or sent automatically. The guest must send the prepared message in WhatsApp to the supplied Ardhas number. Blessings and games are local interactions and reset on refresh.
- Reduced-motion settings suppress decorative animation. Pause ambience controls the continuous CSS effects. Sound starts muted.
- `npm test` runs existing invitation-state regressions and a jsdom integration test covering entry, puzzle completion/reset, decoration, gallery focus restoration, phone validation, RSVP contents, and the exact map coordinates. DOM tests do not verify visual layout, pointer drag physics, live maps, or PNG rendering in a real browser.

The built-in image-generation tool created the illustrative hero at `public/housewarming-home.jpg`, optimized to approximately 450 KB. It is concept artwork, not a photograph of the actual property. The interior gallery photos are illustrative Unsplash references. Replace these with family-approved photos before using this as a photographic record of the real house.

Artwork prompt: "Use case: stylized-concept. Asset: wide luxury Kerala housewarming invitation website hero, no text anywhere. Create one exquisitely detailed photorealistic architectural illustration of an elegant Kerala traditional-modern family home, centered straight-on front elevation with terracotta sloping tiled roofs, carved teak double entrance doors, ivory plaster walls, dark wood columns and welcoming veranda. Lush coconut palms frame both sides, subtle hanging brass oil lamps and marigold garlands flank front door, white jasmine, landscaped tropical garden. Warm late afternoon sun, soft pale champagne ivory sky, cinematic warm golden hour, tasteful Indian traditional aesthetics. Landscape 3:2 composition, entire house visible, ground and path visible foreground, house occupies lower two-thirds, airy sky upper third. Rich deep forest green foliage and ochre tile contrast warm ivory stone. Premium architectural editorial photography with soft painterly atmospheric edges, realistic proportions, high detail, natural shadows. No people, no cars, no lettering, no watermark. This is illustrative demo concept art, not a real property photo."

The adapted React Bits BlurText component retains its license in `src/components/housewarming/REACT-BITS-LICENSE.md`. The rangoli Lottie animation is original local vector animation data.

## Demo walkthrough

1. Choose an event in the homepage collection and explore its three dedicated designs: 36 designs across 12 celebration types.
2. In the design studio, customize invitation text, location, images, colors, fonts, backgrounds, and decorations. Edit the story, schedule, gallery, video, wishes, registry, and family details.
3. Switch between desktop and phone preview sizes. Each event keeps its own draft while you explore; uploaded images stay in memory and are never transmitted.
4. Open the full invitation. Explore the countdown, story, event directions, schedule, gallery, film, wishes, family information, and registry examples.
5. Submit a sample RSVP to see its celebration state. Play the original synthesized melody or use Save PDF to open the browser print dialog.
6. Try Book your website to preview the inquiry flow. WhatsApp opens a chat with +91 9048503717, and Instagram opens the Ardhas Wedding Company profile.

## Project structure

```
src/
  assets/      Original botanical brand artwork
  components/  Shared navigation, reveal and inquiry dialog
  context/     React-state invitation configuration and per-event drafts
  data/        Dedicated event content, photo sources and 36 template designs
  hooks/       GSAP hero and scroll lifecycle
  pages/       Homepage, design studio and invitation preview
  sections/    Shared invitation sections and interactions
  templates/   Reusable invitation designs and event-specific welcome layouts
  styles/      Brand, invitation and studio responsive styles
public/        Brand favicon
```

React 19, Vite, React Router, Framer Motion, GSAP, Tailwind CSS, Lucide React, React Intersection Observer, Swiper, and React Helmet are included. Customizer and full invitation routes are code split. Reduced-motion preferences disable decorative animation. Image galleries load lazily.

## Demo boundaries and handoff

- Edits persist during SPA navigation in React context. Refreshing restores the sample invitation. Nothing is stored on a server or in browser storage.
- WhatsApp links open https://wa.me/919048503717 and Instagram opens the supplied Ardhas Wedding Company profile. Neither automatically sends a message. Booking, email inquiries, family contacts, gift registries, guest wishes, and RSVP remain illustrative; replace those demo destinations before launch.
- Photos are illustrative Unsplash images, fonts load from Google Fonts, and the optional video uses an external sample. These require internet access. Replace with licensed client assets and host optimized assets locally for a final client deployment.
- Music is an original, quiet synthesized instrumental demo played only after interaction; replace it with a licensed traditional recording if desired.
- PDF uses the browser's Print / Save as PDF functionality. Enable background graphics in the print dialog for the complete theme appearance.
- React Helmet 6 uses legacy lifecycle internals. The root intentionally does not enable development StrictMode to avoid its legacy-lifecycle diagnostic under React 19.
- SEO metadata is client rendered. Add prerendering if crawlable social previews or per-event search indexing are required for a commercial deployment.
- Arbitrary user color choices can reduce contrast. Curated defaults provide the intended visual combinations.

## Verification

See `VERIFICATION.md` for recorded checks and limitations. After changing event designs, verify collection previews, per-event drafts, editable invitation sections, uploaded images, and desktop/mobile layouts alongside the production build.
