# Ardhas · Invitations, beautifully reimagined

A premium, responsive invitation website showcase and live design studio. React frontend only, with no backend, authentication, or personal-data submissions.

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

The repository includes a GitHub Pages workflow. Pushing `main` builds and publishes the site at `https://anujithsajan91.github.io/ardhas-invitations/`. Direct invitation and customizer URLs recover through `public/404.html`.

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
