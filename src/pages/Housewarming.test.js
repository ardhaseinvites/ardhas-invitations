import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createServer } from "vite";

test("housewarming entrance, puzzle, gallery and WhatsApp RSVP work together", async () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { url: "http://localhost/housewarming", pretendToBeVisual: true },
  );
  const { window } = dom;
  for (const name of [
    "window",
    "document",
    "navigator",
    "HTMLElement",
    "HTMLSlotElement",
    "Element",
    "Node",
    "HTMLInputElement",
    "HTMLSelectElement",
    "HTMLTextAreaElement",
    "HTMLDialogElement",
    "SVGElement",
    "MutationObserver",
    "Image",
    "DOMParser",
    "XMLSerializer",
  ]) {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      value: name === "window" ? window : window[name],
    });
  }
  globalThis.getComputedStyle = window.getComputedStyle.bind(window);
  globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
  globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  window.scrollTo = () => {};
  window.matchMedia = () => ({
    matches: true,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  });
  globalThis.matchMedia = window.matchMedia;
  window.HTMLElement.prototype.scrollIntoView = () => {};
  window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  globalThis.IntersectionObserver = window.IntersectionObserver = class {
    constructor(callback, options = {}) {
      this.callback = callback;
      this.thresholds = [Number(options.threshold) || 0];
    }
    observe(target) {
      queueMicrotask(() =>
        this.callback(
          [
            {
              target,
              isIntersecting: true,
              intersectionRatio: 1,
              boundingClientRect: target.getBoundingClientRect(),
            },
          ],
          this,
        ),
      );
    }
    unobserve() {}
    disconnect() {}
  };
  const server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  let root;
  let act;
  try {
    const React = await import("react");
    act = React.act;
    const { createRoot } = await import("react-dom/client");
    const { MemoryRouter } = await import("react-router-dom");
    const { default: Housewarming } = await server.ssrLoadModule(
      "/src/pages/Housewarming.jsx",
    );
    root = createRoot(window.document.getElementById("root"));
    await act(async () => {
      root.render(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/housewarming"] },
          React.createElement(Housewarming),
        ),
      );
    });
    const button = (text) =>
      [...document.querySelectorAll("button")].find((node) =>
        node.textContent.includes(text),
      );
    assert.ok(button("Open Invitation"));
    assert.ok(document.querySelector("h1").textContent.includes("Vazhappalli"));
    await act(async () => button("Open Invitation").click());
    assert.ok(document.getElementById("welcome"));
    assert.match(document.body.textContent, /20 September 2026/);
    assert.match(document.body.textContent, /Vazhapplli thekkathil/);
    assert.match(document.body.textContent, /10:00 AM/);
    for (let i = 0; i < 20 && !document.querySelector(".hwg-board"); i++)
      await act(async () => new Promise((resolve) => setTimeout(resolve, 50)));
    assert.equal(document.querySelectorAll("#games").length, 1);
    assert.equal(document.querySelectorAll(".hwg-piece").length, 9);
    for (let position = 0; position < 9; position++) {
      const pieces = [...document.querySelectorAll(".hwg-piece")];
      const source = pieces.findIndex((piece) =>
        piece.getAttribute("aria-label").startsWith(`Piece ${position + 1},`),
      );
      if (source !== position) {
        await act(async () => pieces[source].click());
        await act(async () => pieces[position].click());
      }
    }
    assert.match(
      document.querySelector(".hwg-success").textContent,
      /You unlocked our new home/,
    );
    assert.equal(document.querySelectorAll(".hwg-piece:disabled").length, 9);
    await act(async () => button("Start fresh").click());
    assert.equal(document.querySelectorAll(".hwg-piece:disabled").length, 0);
    await act(async () => button("Add selected decoration").click());
    assert.equal(document.querySelectorAll(".hwg-placed-item").length, 1);
    await act(async () => button("Finish decorating").click());
    assert.match(document.body.textContent, /Beautiful! Welcome Home!/);
    await act(async () => document.querySelector(".hw-gallery-item").click());
    assert.equal(document.querySelector("dialog").open, true);
    await act(async () => document.querySelector(".hw-lightbox-close").click());
    assert.equal(document.querySelector("dialog").open, false);
    assert.equal(
      document.activeElement,
      document.querySelector(".hw-gallery-item"),
    );
    async function fill(name, value) {
      const node = document.querySelector(`[name="${name}"]`);
      const prototype =
        node.tagName === "SELECT"
          ? window.HTMLSelectElement.prototype
          : node.tagName === "TEXTAREA"
            ? window.HTMLTextAreaElement.prototype
            : window.HTMLInputElement.prototype;
      await act(async () => {
        Object.getOwnPropertyDescriptor(prototype, "value").set.call(
          node,
          value,
        );
        node.dispatchEvent(
          new window.Event(node.tagName === "SELECT" ? "change" : "input", {
            bubbles: true,
          }),
        );
      });
    }
    await fill("name", "Test Guest");
    await fill("phone", "invalid1234567");
    await act(async () =>
      document
        .querySelector(".hw-rsvp-card form")
        .dispatchEvent(
          new window.Event("submit", { bubbles: true, cancelable: true }),
        ),
    );
    assert.ok(document.querySelector('[role="alert"]'));
    await fill("phone", "9048503717");
    await fill("guests", "3");
    await fill("message", "Wishing your home endless joy!");
    const phonePattern = document.querySelector('[name="phone"]').pattern;
    assert.doesNotThrow(() => new RegExp(phonePattern, "v"));
    await act(async () =>
      document
        .querySelector(".hw-rsvp-card form")
        .dispatchEvent(
          new window.Event("submit", { bubbles: true, cancelable: true }),
        ),
    );
    const link = document.querySelector(".hw-rsvp-success a");
    assert.ok(link, "valid RSVP should create a WhatsApp handoff");
    const target = new URL(link.href);
    assert.equal(target.hostname, "wa.me");
    assert.equal(target.pathname, "/919048503717");
    assert.match(target.searchParams.get("text"), /Name: Test Guest/);
    assert.match(target.searchParams.get("text"), /Guests: 3/);
    assert.match(
      target.searchParams.get("text"),
      /Wishing your home endless joy!/,
    );
    assert.match(
      document.querySelector(".hw-rsvp-success").textContent,
      /not sent until/,
    );
    const mapLink = document.querySelector(".hw-location-copy a");
    assert.equal(
      new URL(mapLink.href).searchParams.get("query"),
      "9.0478333333,76.6006944444",
    );
  } finally {
    if (root && act) await act(async () => root.unmount());
    await server.close();
    dom.window.close();
  }
});
