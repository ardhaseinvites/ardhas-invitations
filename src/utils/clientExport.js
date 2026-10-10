import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import {
  getMediaSlots,
  validateProjectId,
  getExpectedMediaFilename,
  getSlotStatus,
} from "../data/mediaSlots.js";
import { templates } from "../data/events.js";

/**
 * Downloads a Blob as a file using URL.createObjectURL and immediately revokes it.
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 200);
}

/**
 * Converts a data: URL to a Blob and downloads it.
 */
export function downloadDataUrl(dataUrl, filename) {
  try {
    const [header, base64] = dataUrl.split(",");
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const binary = atob(base64);
    const length = binary.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mime });
    downloadBlob(blob, filename);
    return true;
  } catch (error) {
    console.error("Failed to convert data URL to Blob:", error);
    return false;
  }
}

/**
 * Determines file extension from data URL or mime type.
 */
export function getExtensionFromDataUrl(dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string") return "jpg";
  if (dataUrl.startsWith("data:image/png")) return "png";
  if (dataUrl.startsWith("data:image/webp")) return "webp";
  if (dataUrl.startsWith("data:image/gif")) return "gif";
  if (dataUrl.startsWith("data:image/jpeg") || dataUrl.startsWith("data:image/jpg"))
    return "jpg";
  return "jpg";
}

/**
 * Builds the canonical client details object in Ardhas schema.
 * Never includes Base64 data or video blobs.
 */
export function buildClientDetails(config) {
  const projectIdValidation = validateProjectId(config.projectId);
  if (!projectIdValidation.valid) {
    throw new Error(projectIdValidation.error);
  }

  const projectId = config.projectId.trim();
  const templateObj = templates.find((t) => t.id === config.template) || {
    id: config.template || "wedding-1",
    name: config.template || "Default Template",
  };

  const slots = getMediaSlots(config);

  // Map media slots
  const mediaEntries = {};
  for (const slot of slots) {
    const status = getSlotStatus(slot, config);
    let remoteUrl = null;
    let ext = slot.type === "video" ? "mp4" : "jpg";

    if (slot.configKey === "gallery" && typeof slot.galleryIndex === "number") {
      const gItem = config.gallery?.[slot.galleryIndex];
      const val = gItem?.src || "";
      if (status === "url") remoteUrl = val;
      if (status === "provided_locally") {
        ext = getExtensionFromDataUrl(val);
      }
    } else if (slot.configKey) {
      const val = config[slot.configKey] || "";
      if (status === "url") remoteUrl = val;
      if (status === "provided_locally" && slot.type === "image") {
        ext = getExtensionFromDataUrl(val);
      }
    }

    mediaEntries[slot.id] = {
      slotId: slot.id,
      label: slot.label,
      type: slot.type,
      required: slot.required,
      section: slot.section,
      recommendedAspectRatio: slot.recommendedAspectRatio,
      status, // 'provided_locally' | 'url' | 'empty'
      suggestedFilename: getExpectedMediaFilename(projectId, slot.id, ext),
      originalFileRequiredSeparately: true,
      url: remoteUrl, // Remote URL preserved, local base64/blob is NEVER embedded
    };
  }

  // Filter contacts: only export phone if client explicitly filled it
  const filteredContacts = (config.contacts || []).map((contact) => {
    const entry = {
      id: contact.id,
      name: contact.name || "",
      role: contact.role || "",
      email: contact.email || "",
    };
    if (contact.phone && contact.phone.trim() !== "") {
      entry.phone = contact.phone.trim();
    }
    return entry;
  });

  return {
    schema: "ardhas-client/1.0",
    schemaVersion: "1.0",
    projectId,
    exportedAt: new Date().toISOString(),
    eventType: config.eventType || "Wedding",
    template: {
      id: templateObj.id,
      name: templateObj.name,
      style: config.style,
      layout: config.layout,
    },
    wedding: {
      groomFullName: config.groomFullName || "",
      brideFullName: config.brideFullName || "",
      groomFatherName: config.groomFatherName || "",
      groomMotherName: config.groomMotherName || "",
      brideFatherName: config.brideFatherName || "",
      brideMotherName: config.brideMotherName || "",
      additionalFamily: (config.additionalFamily || []).map((fam) => ({
        id: fam.id,
        name: fam.name || "",
        relationship: fam.relationship || "",
      })),
    },
    events: (config.events || []).map((evt) => ({
      id: evt.id,
      name: evt.name || "",
      date: evt.date || "",
      time: evt.time || "",
      venue: evt.venue || "",
      address: evt.address || "",
    })),
    content: {
      names: config.names || "",
      date: config.date || "",
      time: config.time || "",
      timezone: config.timezone || "+05:30",
      venue: config.venue || "",
      address: config.address || "",
      mapQuery: config.mapQuery || "",
      mapUrl: config.mapUrl || "",
      dressCode: config.dressCode || "",
      story: config.story || "",
      age: config.age || "",
      milestone: config.milestone || "",
      schedule: (config.schedule || []).map((item) => ({
        id: item.id,
        time: item.time || "",
        title: item.title || "",
        text: item.text || "",
      })),
      memories: (config.memories || []).map((item) => ({
        id: item.id,
        title: item.title || "",
        text: item.text || "",
      })),
      wishes: (config.wishes || []).map((item) => ({
        id: item.id,
        quote: item.quote || "",
        author: item.author || "",
      })),
      registry: (config.registry || []).map((item) => ({
        id: item.id,
        title: item.title || "",
        description: item.description || "",
        url: item.url || "",
      })),
      contacts: filteredContacts,
      copy: { ...(config.copy || {}) },
    },
    design: {
      font: config.font || "Serif",
      color: config.color || "#8d7045",
      style: config.style || "minimal",
      layout: config.layout || "editorial",
      background: config.background || "Plain",
      decorations: { ...(config.decorations || {}) },
    },
    sections: { ...(config.sections || {}) },
    customFields: (config.customFields || []).map((cf) => ({
      id: cf.id,
      label: cf.label || "",
      type: cf.type || "text",
      value: cf.value || "",
    })),
    media: mediaEntries,
    note: "This file is generated for sending to Ardhas for publishing. It does not contain media binary data.",
  };
}

/**
 * Downloads the client details JSON file.
 */
export function downloadClientJson(config) {
  const details = buildClientDetails(config);
  const jsonString = JSON.stringify(details, null, 2);
  const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
  downloadBlob(blob, `client-details-${details.projectId}.json`);
  return true;
}

/**
 * Builds plain-text media checklist for the selected template.
 */
export function generateMediaChecklist(config) {
  const projectIdValidation = validateProjectId(config.projectId);
  const projectId = projectIdValidation.valid
    ? config.projectId.trim()
    : "your-project-id";

  const templateObj = templates.find((t) => t.id === config.template) || {
    id: config.template || "wedding-1",
    name: config.template || "Default Template",
  };

  const slots = getMediaSlots(config);
  const dateStr = new Date().toISOString().split("T")[0];

  const lines = [
    "============================================================",
    "ARDHAS MEDIA CHECKLIST",
    "============================================================",
    `Project ID : ${projectId}`,
    `Event Type : ${config.eventType || "Wedding"}`,
    `Template   : ${templateObj.name} (${templateObj.id})`,
    `Date       : ${dateStr}`,
    "============================================================",
    "",
    "IMPORTANT NOTICE:",
    "Images and videos selected in the browser preview were stored",
    "locally in your browser session only. They have NOT been sent",
    "to Ardhas. Please use this checklist to assemble your original,",
    "high-resolution media files and deliver them to Ardhas.",
    "",
    "------------------------------------------------------------",
    "MEDIA SLOTS & STATUS",
    "------------------------------------------------------------",
  ];

  for (const slot of slots) {
    const status = getSlotStatus(slot, config);
    const isSelected =
      status === "provided_locally" || status === "url";
    const statusLabel = isSelected
      ? "Selected in preview"
      : "Not added in preview";
    const requiredLabel = slot.required ? "REQUIRED" : "Optional";
    const ext = slot.type === "video" ? "mp4" : "jpg";
    const expectedFilename = getExpectedMediaFilename(projectId, slot.id, ext);

    lines.push(
      `[${isSelected ? "X" : " "}] Slot ID: ${slot.id}`,
      `    Purpose     : ${slot.label} (${slot.section})`,
      `    Type        : ${slot.type.toUpperCase()}`,
      `    Requirement : ${requiredLabel}`,
      `    Status      : ${statusLabel}`,
      `    File Name   : ${expectedFilename}`,
      `    Guideline   : ${slot.recommendedAspectRatio}`,
      "",
    );
  }

  lines.push(
    "------------------------------------------------------------",
    "DELIVERY INSTRUCTIONS",
    "------------------------------------------------------------",
    "1. Name each file exactly as shown above (e.g. " +
      getExpectedMediaFilename(projectId, "HERO_IMAGE", "jpg") +
      ").",
    "2. If you clicked 'Download my images' in the studio, your",
    "   browser will save your preview photos pre-named to match.",
    "3. Original, uncompressed photos from your photographer are",
    "   recommended for the best visual quality on mobile devices.",
    "4. For video files: send original MP4 files separately via",
    "   Google Drive, WeTransfer, or share an unlisted YouTube link.",
    "5. Send all files and your 'client-details-" +
      projectId +
      ".json' file",
    "   to Ardhas via WhatsApp (+91 9048503717) or Google Drive.",
    "============================================================",
  );

  return lines.join("\n");
}

/**
 * Downloads the media checklist as a .txt file.
 */
export function downloadMediaChecklist(config) {
  const text = generateMediaChecklist(config);
  const projectIdValidation = validateProjectId(config.projectId);
  const projectId = projectIdValidation.valid
    ? config.projectId.trim()
    : "client";
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, `media-checklist-${projectId}.txt`);
  return true;
}

/**
 * Converts each locally uploaded image (data: URL) to a file named
 * <project-id>_<SLOT_ID>.<ext> and downloads it.
 * Videos are NOT downloaded this way.
 * Returns { downloadedCount, items: [] }
 */
export function downloadRenamedImages(config) {
  const projectIdValidation = validateProjectId(config.projectId);
  if (!projectIdValidation.valid) {
    throw new Error(projectIdValidation.error);
  }
  const projectId = config.projectId.trim();
  const slots = getMediaSlots(config);

  const imagesToDownload = [];

  for (const slot of slots) {
    if (slot.type !== "image") continue;

    let dataUrl = "";
    if (slot.configKey === "gallery" && typeof slot.galleryIndex === "number") {
      dataUrl = config.gallery?.[slot.galleryIndex]?.src || "";
    } else if (slot.configKey) {
      dataUrl = config[slot.configKey] || "";
    }

    if (dataUrl && dataUrl.startsWith("data:")) {
      const ext = getExtensionFromDataUrl(dataUrl);
      const filename = getExpectedMediaFilename(projectId, slot.id, ext);
      imagesToDownload.push({ dataUrl, filename, slotId: slot.id });
    }
  }

  // Trigger downloads with a slight stagger so browser doesn't block them
  imagesToDownload.forEach((item, index) => {
    setTimeout(() => {
      downloadDataUrl(item.dataUrl, item.filename);
    }, index * 250);
  });

  return {
    downloadedCount: imagesToDownload.length,
    items: imagesToDownload.map((d) => d.filename),
  };
}

/**
 * Direct client-side PDF download using jsPDF and html-to-image.
 * Captures the invitation DOM including the Ardhas Order Sheet.
 * Blocks if project ID is invalid.
 * Filename: invitation-<project-id>.pdf
 */
export async function downloadClientPdf(config, element = null) {
  const projectIdValidation = validateProjectId(config.projectId);
  if (!projectIdValidation.valid) {
    throw new Error(projectIdValidation.error);
  }

  const projectId = config.projectId.trim();
  const filename = `invitation-${projectId}.pdf`;

  // If running in browser environment with DOM access
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const target =
      element ||
      document.querySelector(".invitation:not(.invitation-compact)") ||
      document.querySelector(".invitation");

    if (!target) {
      throw new Error("Invitation element could not be found for PDF capture.");
    }

    // Identify elements to manipulate
    const orderSheet =
      target.querySelector(".ardhas-order-sheet") ||
      document.querySelector(".ardhas-order-sheet");
    const toolbar = target.querySelector(".invite-toolbar");
    const scrollParent = target.closest(".customizer-preview-scroll");
    const frameParent = target.closest(".customizer-preview-frame");

    // Track original styles to restore in finally
    let prevOrderSheetDisplay = "";
    let prevOrderSheetWidth = "";
    let prevToolbarDisplay = "";
    let prevTargetOverflow = "";
    let prevTargetHeight = "";
    let prevTargetMaxHeight = "";
    let prevScrollOverflow = "";
    let prevScrollHeight = "";
    let prevScrollMaxHeight = "";
    let prevFrameHeight = "";
    let prevFrameMaxHeight = "";

    // Track all reveal / motion sections so they can be set to opacity: 1 and restored
    const animatedElements = Array.from(
      target.querySelectorAll(
        ".invite-section, [data-projection-id], section, article"
      )
    );
    const originalAnimatedStyles = animatedElements.map((el) => ({
      el,
      opacity: el.style.opacity,
      transform: el.style.transform,
      visibility: el.style.visibility,
      transition: el.style.transition,
      animation: el.style.animation,
    }));

    // Add capturing class to document.body and target
    document.body.classList.add("ardhas-pdf-capturing");
    target.classList.add("ardhas-pdf-capturing");

    try {
      // 1. Force reveal on every animated section
      animatedElements.forEach((el) => {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
        el.style.setProperty("visibility", "visible", "important");
        el.style.setProperty("transition", "none", "important");
        el.style.setProperty("animation", "none", "important");
      });

      // 2. Expand scroll and frame containers so content isn't clipped
      if (scrollParent) {
        prevScrollOverflow = scrollParent.style.overflow;
        prevScrollHeight = scrollParent.style.height;
        prevScrollMaxHeight = scrollParent.style.maxHeight;
        scrollParent.style.setProperty("overflow", "visible", "important");
        scrollParent.style.setProperty("height", "auto", "important");
        scrollParent.style.setProperty("max-height", "none", "important");
      }
      if (frameParent) {
        prevFrameHeight = frameParent.style.height;
        prevFrameMaxHeight = frameParent.style.maxHeight;
        frameParent.style.setProperty("height", "auto", "important");
        frameParent.style.setProperty("max-height", "none", "important");
      }

      prevTargetOverflow = target.style.overflow;
      prevTargetHeight = target.style.height;
      prevTargetMaxHeight = target.style.maxHeight;
      target.style.setProperty("overflow", "visible", "important");
      target.style.setProperty("height", "auto", "important");
      target.style.setProperty("max-height", "none", "important");

      // 3. Hide floating toolbar during capture
      if (toolbar) {
        prevToolbarDisplay = toolbar.style.display;
        toolbar.style.display = "none";
      }

      // 4. Hide order sheet while capturing the invitation itself
      if (orderSheet) {
        prevOrderSheetDisplay = orderSheet.style.display;
        prevOrderSheetWidth = orderSheet.style.width;
        orderSheet.style.setProperty("display", "none", "important");
      }

      // 5. Wait for fonts and images
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {}
      }

      const imgs = Array.from(target.querySelectorAll("img"));
      await Promise.all(
        imgs.map((img) => {
          img.loading = "eager";
          if (img.complete && img.naturalHeight > 0) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
            setTimeout(resolve, 1500);
          });
        })
      );

      // Brief reflow settle pause
      await new Promise((resolve) => setTimeout(resolve, 180));

      // 6. Capture Invitation Body (without Order Sheet)
      const invitationWidth = target.scrollWidth || target.offsetWidth || 800;
      const invitationHeight = target.scrollHeight || target.offsetHeight;

      const invitationDataUrl = await toPng(target, {
        quality: 0.95,
        backgroundColor: "#ffffff",
        width: invitationWidth,
        height: invitationHeight,
        filter: (node) => {
          if (
            node.classList &&
            (node.classList.contains("invite-music") ||
              node.classList.contains("invite-video-toggle") ||
              node.classList.contains("ardhas-order-sheet"))
          ) {
            return false;
          }
          return true;
        },
      });

      // 7. Capture Ardhas Order Sheet separately so it starts on its own page
      let orderSheetDataUrl = null;
      if (orderSheet) {
        orderSheet.style.setProperty("display", "block", "important");
        orderSheet.style.setProperty("visibility", "visible", "important");
        orderSheet.style.setProperty("opacity", "1", "important");
        orderSheet.style.setProperty("width", `${invitationWidth}px`, "important");

        // Allow layout to calculate
        await new Promise((resolve) => setTimeout(resolve, 80));

        orderSheetDataUrl = await toPng(orderSheet, {
          quality: 0.95,
          backgroundColor: "#ffffff",
          width: invitationWidth,
          height: orderSheet.scrollHeight || orderSheet.offsetHeight,
        });
      }

      // 8. Build multi-page PDF with jsPDF (A4 format)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Load invitation image
      const invImg = new Image();
      invImg.src = invitationDataUrl;
      await new Promise((resolve, reject) => {
        invImg.onload = resolve;
        invImg.onerror = reject;
      });

      const invImgWidth = pdfWidth;
      const invImgHeight = (invImg.height * pdfWidth) / invImg.width;

      let heightLeft = invImgHeight;
      let position = 0;

      // Page 1
      pdf.addImage(
        invitationDataUrl,
        "PNG",
        0,
        position,
        invImgWidth,
        invImgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pdfHeight;

      // Paginate subsequent invitation pages (5mm threshold prevents trailing blank pages)
      while (heightLeft > 5) {
        position = heightLeft - invImgHeight;
        pdf.addPage();
        pdf.addImage(
          invitationDataUrl,
          "PNG",
          0,
          position,
          invImgWidth,
          invImgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pdfHeight;
      }

      // 9. Order Sheet starts AT THE TOP of its own new page!
      if (orderSheetDataUrl) {
        pdf.addPage();

        const osImg = new Image();
        osImg.src = orderSheetDataUrl;
        await new Promise((resolve, reject) => {
          osImg.onload = resolve;
          osImg.onerror = reject;
        });

        const osImgWidth = pdfWidth;
        const osImgHeight = (osImg.height * pdfWidth) / osImg.width;

        let osHeightLeft = osImgHeight;
        let osPosition = 0;

        pdf.addImage(
          orderSheetDataUrl,
          "PNG",
          0,
          osPosition,
          osImgWidth,
          osImgHeight,
          undefined,
          "FAST"
        );
        osHeightLeft -= pdfHeight;

        while (osHeightLeft > 5) {
          osPosition = osHeightLeft - osImgHeight;
          pdf.addPage();
          pdf.addImage(
            orderSheetDataUrl,
            "PNG",
            0,
            osPosition,
            osImgWidth,
            osImgHeight,
            undefined,
            "FAST"
          );
          osHeightLeft -= pdfHeight;
        }
      }

      pdf.save(filename);
      return filename;
    } catch (err) {
      throw new Error(
        `Quick preview PDF generation failed: ${err.message}. Please use the "Print / Save as PDF" button instead.`,
      );
    } finally {
      // 10. Guaranteed DOM Restoration
      document.body.classList.remove("ardhas-pdf-capturing");
      target.classList.remove("ardhas-pdf-capturing");

      originalAnimatedStyles.forEach(({ el, opacity, transform, visibility, transition, animation }) => {
        el.style.opacity = opacity;
        el.style.transform = transform;
        el.style.visibility = visibility;
        el.style.transition = transition;
        el.style.animation = animation;
      });

      if (scrollParent) {
        scrollParent.style.overflow = prevScrollOverflow;
        scrollParent.style.height = prevScrollHeight;
        scrollParent.style.maxHeight = prevScrollMaxHeight;
      }
      if (frameParent) {
        frameParent.style.height = prevFrameHeight;
        frameParent.style.maxHeight = prevFrameMaxHeight;
      }

      target.style.overflow = prevTargetOverflow;
      target.style.height = prevTargetHeight;
      target.style.maxHeight = prevTargetMaxHeight;

      if (orderSheet) {
        orderSheet.style.display = prevOrderSheetDisplay;
        orderSheet.style.width = prevOrderSheetWidth;
      }
      if (toolbar) {
        toolbar.style.display = prevToolbarDisplay;
      }
    }
  }

  return filename;
}

export default {
  downloadBlob,
  downloadDataUrl,
  getExtensionFromDataUrl,
  buildClientDetails,
  downloadClientJson,
  generateMediaChecklist,
  downloadMediaChecklist,
  downloadRenamedImages,
  downloadClientPdf,
};

