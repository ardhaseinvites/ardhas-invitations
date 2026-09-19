# Ardhas verification

## Current implementation

- 12 event collections with three dedicated designs each (36 total), using event-specific content, imagery and motifs plus editorial, arch and split compositions.
- All invitation text is editable, including section headings, form labels, countdown labels, success messages and gallery/music/PDF/video controls.
- Venue, full address, map search/link, date, time, UTC offset and dress code are configurable. Maps follow the edited address unless an explicit search or link overrides it.
- Welcome, background, video cover and gallery images support replacement and removal. Gallery photos, memories, schedule, guest wishes, registry cards and contacts support adding, removing and reordering.
- Event drafts are independent in React memory. Switching events preserves each draft; reset affects the current event only. Refresh clears all session drafts.
- Brand, metadata, navigation and package name use Ardhas. The existing Desktop folder remains aurelle-invitations.
- Instagram and both WhatsApp links retain the supplied Ardhas profile and +91 9048503717 destination.

## Automated checks

Run `npm test` for five Node tests covering all 36 designs, independent default objects, per-event draft preservation, applying designs without losing authored content, reset scope and invalid deep links.

Production compilation: `npm run build` passes.

Independent code reviews covered rendering, data contracts, empty galleries, safe map/registry/video URLs, upload races, date handling, live thumbnails and editor keyboard behavior.

## Browser checks

- All 12 event types displayed three distinct variants and their expected event motif/names.
- Customized birthday host, age, story heading and video title updated immediately.
- An edited Mumbai address produced the matching Google Maps URL.
- Switching from an edited birthday to housewarming and back retained the birthday draft.
- Hiding and restoring the gallery retained its content.
- Real PNG uploads decoded successfully for welcome and gallery images; replacement rendered immediately.
- Moving the uploaded gallery photo down updated displayed order; removal reduced the gallery count.
- Keyboard ArrowRight moved selection and focus from Content to Design.
- 390px homepage and customizer rendered without horizontal page or preview overflow.
- 1440px collection and 390px editor screenshots were visually inspected. Full invitation canvases scale into thumbnails without cropped names or dates.
- No application JavaScript errors during the isolated browser smoke checks.

## Limits

- Earlier Lighthouse scores applied to the previous showcase version; they have not been re-measured for this expanded editor.
- Print styling is retained but final PDF pagination has not been visually inspected.
- External images/fonts/sample video require internet access. Substitute licensed client assets before commercial publication.
- RSVP and booking are still frontend demos, with no persistence or transmission. Configured family, registry, Instagram and WhatsApp links open their specified destinations.
- Arbitrary custom colors can reduce heading/background contrast; check custom palettes before sharing.
