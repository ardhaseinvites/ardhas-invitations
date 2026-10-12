import test from "node:test";
import assert from "node:assert/strict";
import {
  validateProjectId,
  validateCustomFieldId,
  getMediaSlots,
  getExpectedMediaFilename,
  getSlotStatus,
} from "../data/mediaSlots.js";
import {
  buildClientDetails,
  generateMediaChecklist,
  getExtensionFromDataUrl,
  downloadClientPdf,
} from "./clientExport.js";
import {
  getEventDefaults,
  templates,
  eventTypes,
} from "../data/events.js";
import {
  createInvitationState,
  invitationReducer,
} from "../context/invitationState.js";

test("Project ID validation rules", () => {
  // Valid IDs: 3 to 40 characters, lowercase letters, numbers, hyphens only
  assert.equal(validateProjectId("aswin-weds-anisree").valid, true);
  assert.equal(validateProjectId("abc").valid, true);
  assert.equal(validateProjectId("wedding-2027-client-01").valid, true);
  assert.equal(validateProjectId("a".repeat(40)).valid, true);

  // Invalid IDs
  assert.equal(validateProjectId("").valid, false);
  assert.equal(validateProjectId("ab").valid, false); // < 3
  assert.equal(validateProjectId("a".repeat(41)).valid, false); // > 40
  assert.equal(validateProjectId("aswin-weds-anisree").valid, false); // Uppercase
  assert.equal(validateProjectId("nikhil weds anjali").valid, false); // Spaces
  assert.equal(validateProjectId("nikhil_weds_anjali").valid, false); // Underscores
  assert.equal(validateProjectId("nikhil@wedding").valid, false); // Special chars
});

test("Custom Field ID validation rules (lower_snake, non-empty, unique)", () => {
  // Valid lower_snake
  assert.equal(validateCustomFieldId("grooms_grandfather").valid, true);
  assert.equal(validateCustomFieldId("mahurat_time").valid, true);
  assert.equal(validateCustomFieldId("field1").valid, true);
  assert.equal(validateCustomFieldId("a_b_c_123").valid, true);

  // Invalid formats
  assert.equal(validateCustomFieldId("").valid, false);
  assert.equal(validateCustomFieldId("   ").valid, false);
  assert.equal(validateCustomFieldId("GroomGrandfather").valid, false); // PascalCase
  assert.equal(validateCustomFieldId("groomGrandfather").valid, false); // camelCase
  assert.equal(validateCustomFieldId("GROOMS_GRANDFATHER").valid, false); // UPPER_SNAKE
  assert.equal(validateCustomFieldId("grooms-grandfather").valid, false); // kebab-case
  assert.equal(validateCustomFieldId("grooms grandfather").valid, false); // spaces
  assert.equal(validateCustomFieldId("1grooms_grandfather").valid, false); // leading digit

  // Duplicate detection
  const existingIds = ["grooms_grandfather", "mahurat_time"];
  assert.equal(validateCustomFieldId("grooms_grandfather", existingIds).valid, false);
  assert.equal(validateCustomFieldId("brides_grandmother", existingIds).valid, true);
});

test("Default state includes new wedding fields, events repeater, and custom fields without corrupting demo defaults", () => {
  const weddingDefaults = getEventDefaults("Wedding");
  assert.equal(weddingDefaults.projectId, "");
  assert.equal(weddingDefaults.groomFullName, "");
  assert.equal(weddingDefaults.brideFullName, "");
  assert.equal(weddingDefaults.groomFatherName, "");
  assert.equal(weddingDefaults.groomMotherName, "");
  assert.equal(weddingDefaults.brideFatherName, "");
  assert.equal(weddingDefaults.brideMotherName, "");
  assert.deepEqual(weddingDefaults.additionalFamily, []);
  assert.ok(Array.isArray(weddingDefaults.events));
  assert.equal(weddingDefaults.events.length, 1);
  assert.equal(weddingDefaults.events[0].name, "Wedding");
  assert.deepEqual(weddingDefaults.customFields, []);

  // Demo content remains intact
  assert.equal(weddingDefaults.names, "Aarav & Diya");
  assert.ok(weddingDefaults.date);
  assert.ok(weddingDefaults.venue);
});

test("Reducer handles updating wedding fields, family repeater, multiple events, and custom fields", () => {
  let state = createInvitationState();
  state = invitationReducer(state, {
    type: "update",
    patch: {
      projectId: "aswin-weds-anisree",
      groomFullName: "Nikhil Suresh Menon",
      brideFullName: "Anjali Rajan Pillai",
      groomFatherName: "Suresh Menon",
      groomMotherName: "Latha Menon",
      brideFatherName: "Rajan Pillai",
      brideMotherName: "Suma Pillai",
      additionalFamily: [
        { id: "fam-1", name: "Ramakrishnan Nair", relationship: "Grandfather" },
      ],
      events: [
        {
          id: "evt-1",
          name: "Muhurtham",
          date: "2027-02-22",
          time: "10:00",
          venue: "Leela Ashtamudi",
          address: "Kollam",
        },
        {
          id: "evt-2",
          name: "Reception",
          date: "2027-02-22",
          time: "18:00",
          venue: "Le Méridien",
          address: "Kochi",
        },
      ],
      customFields: [
        {
          id: "nakshatra",
          label: "Groom's Birth Star",
          type: "text",
          value: "Rohini",
        },
      ],
    },
  });

  const draft = state.drafts.Wedding;
  assert.equal(draft.projectId, "aswin-weds-anisree");
  assert.equal(draft.groomFullName, "Nikhil Suresh Menon");
  assert.equal(draft.brideFullName, "Anjali Rajan Pillai");
  assert.equal(draft.additionalFamily.length, 1);
  assert.equal(draft.events.length, 2);
  assert.equal(draft.events[1].name, "Reception");
  assert.equal(draft.customFields.length, 1);
  assert.equal(draft.customFields[0].id, "nakshatra");
});

test("Media slots are strictly unique across all 36 templates and match slot naming conventions", () => {
  for (const template of templates) {
    const slots = getMediaSlots({
      eventType: template.eventType,
      template: template.id,
      gallery: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    });

    const slotIds = slots.map((s) => s.id);
    const uniqueIds = new Set(slotIds);
    assert.equal(slotIds.length, uniqueIds.size, `Duplicate slot found in template ${template.id}`);

    // Required slots check
    const heroSlot = slots.find((s) => s.id === "HERO_IMAGE");
    assert.ok(heroSlot, `HERO_IMAGE missing in ${template.id}`);
    assert.equal(heroSlot.required, true);

    // Gallery slot numbering
    assert.ok(slots.some((s) => s.id === "GALLERY_IMAGE_01"));
    assert.ok(slots.some((s) => s.id === "GALLERY_IMAGE_04"));
  }
});

test("Expected filename generation", () => {
  assert.equal(
    getExpectedMediaFilename("aswin-weds-anisree", "HERO_IMAGE", "jpg"),
    "aswin-weds-anisree_HERO_IMAGE.jpg",
  );
  assert.equal(
    getExpectedMediaFilename("aswin-weds-anisree", "WEDDING_VIDEO", "mp4"),
    "aswin-weds-anisree_WEDDING_VIDEO.mp4",
  );
});

test("Slot status detection correctly identifies local, url, and empty assets", () => {
  const config = {
    heroImage: "data:image/jpeg;base64,samplebase64data",
    heroVideoUrl: "blob:http://localhost/12345",
    videoPoster: "https://images.unsplash.com/sample.jpg",
    videoUrl: "https://www.youtube.com/watch?v=sample",
    image: "",
    gallery: [
      { id: "1", src: "data:image/png;base64,gallerysample" },
      { id: "2", src: "https://example.com/gallery2.jpg" },
      { id: "3", src: "" },
    ],
  };

  const slots = getMediaSlots({ eventType: "Wedding", gallery: config.gallery });

  const heroImageSlot = slots.find((s) => s.id === "HERO_IMAGE");
  assert.equal(getSlotStatus(heroImageSlot, config), "provided_locally");

  const heroVideoSlot = slots.find((s) => s.id === "HERO_VIDEO");
  assert.equal(getSlotStatus(heroVideoSlot, config), "provided_locally");

  const posterSlot = slots.find((s) => s.id === "VIDEO_POSTER");
  assert.equal(getSlotStatus(posterSlot, config), "url");

  const videoSlot = slots.find((s) => s.id === "WEDDING_VIDEO");
  assert.equal(getSlotStatus(videoSlot, config), "url");

  const bgSlot = slots.find((s) => s.id === "BACKGROUND_IMAGE");
  assert.equal(getSlotStatus(bgSlot, config), "empty");

  const g1Slot = slots.find((s) => s.id === "GALLERY_IMAGE_01");
  assert.equal(getSlotStatus(g1Slot, config), "provided_locally");

  const g2Slot = slots.find((s) => s.id === "GALLERY_IMAGE_02");
  assert.equal(getSlotStatus(g2Slot, config), "url");

  const g3Slot = slots.find((s) => s.id === "GALLERY_IMAGE_03");
  assert.equal(getSlotStatus(g3Slot, config), "empty");
});

test("buildClientDetails throws error when project ID is missing or invalid", () => {
  const configWithoutProject = { ...getEventDefaults("Wedding"), projectId: "" };
  assert.throws(() => buildClientDetails(configWithoutProject), /Project ID is required/);

  const configWithInvalidProject = {
    ...getEventDefaults("Wedding"),
    projectId: "Invalid Project ID With Spaces",
  };
  assert.throws(() => buildClientDetails(configWithInvalidProject), /lowercase letters, numbers, and hyphens/);
});

test("buildClientDetails produces clean JSON without Base64 blobs, preserves remote URLs, and honors contact rules", () => {
  const config = {
    ...getEventDefaults("Wedding"),
    projectId: "aswin-weds-anisree",
    groomFullName: "Nikhil Suresh Menon",
    brideFullName: "Anjali Rajan Pillai",
    heroImage: "data:image/jpeg;base64,VmVyeUxvcmdlQmFzZTY0U3RyaW5nVGhhdE11c3ROb3RCZUluSlNPTg==",
    heroVideoUrl: "blob:http://localhost/blob-id",
    videoPoster: "https://images.unsplash.com/sample-poster.jpg",
    videoUrl: "https://www.youtube.com/watch?v=sample123",
    gallery: [
      { id: "1", src: "data:image/png;base64,Z2FsbGVyeWltZzE=" },
      { id: "2", src: "https://images.unsplash.com/sample2.jpg" },
    ],
    contacts: [
      { id: "c1", name: "Suresh Menon", role: "Father", phone: "  +91 9847000001  ", email: "suresh@example.com" },
      { id: "c2", name: "Rajan Pillai", role: "Father", phone: "", email: "rajan@example.com" }, // Phone not provided
    ],
    customFields: [
      { id: "grooms_kuladevata", label: "Groom's Kuladevata", type: "text", value: "Sree Krishna Temple" },
    ],
  };

  const details = buildClientDetails(config);

  // Schema & metadata
  assert.equal(details.schema, "ardhas-client/1.0");
  assert.equal(details.schemaVersion, "1.0");
  assert.equal(details.projectId, "aswin-weds-anisree");
  assert.ok(details.exportedAt);
  assert.equal(details.eventType, "Wedding");

  // Wedding & Family
  assert.equal(details.wedding.groomFullName, "Nikhil Suresh Menon");
  assert.equal(details.wedding.brideFullName, "Anjali Rajan Pillai");

  // Custom fields
  assert.equal(details.customFields.length, 1);
  assert.equal(details.customFields[0].id, "grooms_kuladevata");

  // Media entries checks
  const serialized = JSON.stringify(details);
  assert.equal(serialized.includes("data:image/"), false, "JSON must NOT contain Base64 data URLs");
  assert.equal(serialized.includes("blob:"), false, "JSON must NOT contain local blob: URLs");

  // Remote URLs are preserved
  assert.equal(details.media.VIDEO_POSTER.url, "https://images.unsplash.com/sample-poster.jpg");
  assert.equal(details.media.WEDDING_VIDEO.url, "https://www.youtube.com/watch?v=sample123");
  assert.equal(details.media.GALLERY_IMAGE_02.url, "https://images.unsplash.com/sample2.jpg");

  // Local uploads status & separate delivery flag
  assert.equal(details.media.HERO_IMAGE.status, "provided_locally");
  assert.equal(details.media.HERO_IMAGE.url, null);
  assert.equal(details.media.HERO_IMAGE.originalFileRequiredSeparately, true);
  assert.equal(details.media.HERO_IMAGE.suggestedFilename, "aswin-weds-anisree_HERO_IMAGE.jpg");

  assert.equal(details.media.GALLERY_IMAGE_01.status, "provided_locally");
  assert.equal(details.media.GALLERY_IMAGE_01.suggestedFilename, "aswin-weds-anisree_GALLERY_IMAGE_01.png");

  // Contacts rule: phone only exported if explicitly filled
  assert.equal(details.content.contacts[0].phone, "+91 9847000001");
  assert.equal("phone" in details.content.contacts[1], false, "Empty contact number must not be exported");
});

test("Media checklist is generated dynamically for the selected template", () => {
  const config = {
    ...getEventDefaults("Engagement"),
    projectId: "arjun-meera-engagement",
    template: "engagement-2",
  };

  const checklist = generateMediaChecklist(config);

  assert.ok(checklist.includes("ARDHAS MEDIA CHECKLIST"));
  assert.ok(checklist.includes("Project ID : arjun-meera-engagement"));
  assert.ok(checklist.includes("Template   : Blush Promise (engagement-2)"));
  assert.ok(checklist.includes("Slot ID: HERO_IMAGE"));
  assert.ok(checklist.includes("Slot ID: GALLERY_IMAGE_01"));
  assert.ok(checklist.includes("DELIVERY INSTRUCTIONS"));
  assert.ok(checklist.includes("IMPORTANT NOTICE:"));
  assert.ok(checklist.includes("have NOT been sent"));
});

test("downloadClientPdf validates project ID and generates correct filename", async () => {
  // Missing project ID
  await assert.rejects(
    async () => downloadClientPdf({ ...getEventDefaults("Wedding"), projectId: "" }),
    /Project ID is required/,
  );

  // Invalid project ID (spaces, uppercase)
  await assert.rejects(
    async () =>
      downloadClientPdf({
        ...getEventDefaults("Wedding"),
        projectId: "Invalid ID With Spaces",
      }),
    /lowercase letters, numbers, and hyphens/,
  );

  // Valid project ID resolves filename invitation-<project-id>.pdf
  const filename = await downloadClientPdf({
    ...getEventDefaults("Wedding"),
    projectId: "aswin-weds-anisree",
  });
  assert.equal(filename, "invitation-aswin-weds-anisree.pdf");
});


