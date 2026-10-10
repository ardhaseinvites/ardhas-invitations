import test from "node:test";
import assert from "node:assert/strict";
import {
  eventTypes,
  getEventDefaults,
  getEventTemplates,
  templates,
} from "../data/events.js";
import { createInvitationState, invitationReducer } from "./invitationState.js";

test("every occasion has dedicated designs and its own content", () => {
  assert.equal(eventTypes.length, 16);
  assert.equal(new Set(templates.map((item) => item.id)).size, 80);
  for (const eventType of eventTypes) {
    const designs = getEventTemplates(eventType);
    assert.equal(designs.length, 5);
    assert.equal(new Set(designs.map((item) => item.layout)).size, 5);
    for (const design of designs) {
      const config = getEventDefaults(eventType, design.id);
      assert.equal(config.eventType, eventType);
      assert.equal(config.template, design.id);
      assert.ok(config.heroImage && config.copy.invitationLine);
      assert.ok(config.schedule.length > 0 && config.gallery.length > 0);
    }
  }
  assert.notEqual(
    getEventDefaults("Birthday").heroImage,
    getEventDefaults("Wedding").heroImage,
  );
  assert.notEqual(
    getEventDefaults("Housewarming").names,
    getEventDefaults("Wedding").names,
  );
});

test("switching occasions preserves each independent draft, including uploaded images and custom copy", () => {
  let state = createInvitationState();
  state = invitationReducer(state, {
    type: "update",
    patch: {
      names: "Custom wedding names",
      heroImage: "data:image/png;base64,example",
      copy: { ...state.drafts.Wedding.copy, storyTitle: "Our personal story" },
    },
  });
  state = invitationReducer(state, { type: "event", eventType: "Birthday" });
  assert.equal(state.drafts.Birthday.names, "Ananya");
  state = invitationReducer(state, {
    type: "update",
    patch: { names: "Birthday host", age: "40" },
  });
  state = invitationReducer(state, { type: "event", eventType: "Wedding" });
  assert.equal(state.drafts.Wedding.names, "Custom wedding names");
  assert.equal(state.drafts.Wedding.copy.storyTitle, "Our personal story");
  assert.equal(state.drafts.Wedding.heroImage, "data:image/png;base64,example");
  assert.equal(state.drafts.Birthday.age, "40");
});

test("applying a dedicated design selects its event without losing authored content", () => {
  let state = createInvitationState();
  state = invitationReducer(state, { type: "template", id: "birthday-2" });
  assert.equal(state.activeEvent, "Birthday");
  assert.equal(state.drafts.Birthday.layout, "arch");
  state = invitationReducer(state, {
    type: "update",
    patch: { story: "My birthday story", gallery: [], venue: "My venue" },
  });
  state = invitationReducer(state, { type: "template", id: "birthday-3" });
  assert.equal(state.drafts.Birthday.story, "My birthday story");
  assert.deepEqual(state.drafts.Birthday.gallery, []);
  assert.equal(state.drafts.Birthday.venue, "My venue");
  assert.equal(state.drafts.Birthday.layout, "split");
});

test("reset restores only the active occasion and defaults never share mutable data", () => {
  const first = getEventDefaults("Birthday"),
    second = getEventDefaults("Birthday");
  first.copy.storyTitle = "Changed";
  first.gallery.length = 0;
  assert.notEqual(first.copy.storyTitle, second.copy.storyTitle);
  assert.ok(second.gallery.length);
  let state = invitationReducer(createInvitationState(), {
    type: "update",
    patch: { names: "Keep wedding" },
  });
  state = invitationReducer(state, { type: "event", eventType: "Birthday" });
  state = invitationReducer(state, {
    type: "update",
    patch: { names: "Reset birthday" },
  });
  state = invitationReducer(state, { type: "reset" });
  assert.equal(state.drafts.Birthday.names, "Ananya");
  assert.equal(state.drafts.Wedding.names, "Keep wedding");
});

test("invalid deep-link event or template cannot corrupt state", () => {
  const state = createInvitationState();
  assert.equal(
    invitationReducer(state, { type: "event", eventType: "Unknown" }),
    state,
  );
  assert.equal(
    invitationReducer(state, { type: "template", id: "unknown" }),
    state,
  );
});
