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

    const orderSheet = target.querySelector(".ardhas-order-sheet");
    let prevDisplay = "";
    const toolbar = target.querySelector(".invite-toolbar");
    let prevToolbarDisplay = "";

    try {
      // Unhide Ardhas Order Sheet during capture so it is included in the PDF
      if (orderSheet) {
        prevDisplay = orderSheet.style.display;
        orderSheet.style.setProperty("display", "block", "important");
      }

      // Hide on-screen floating toolbar if present inside target
      if (toolbar) {
        prevToolbarDisplay = toolbar.style.display;
        toolbar.style.display = "none";
      }

      const dataUrl = await toPng(target, {
        quality: 0.95,
        backgroundColor: "#ffffff",
        filter: (node) => {
          if (
            node.classList &&
            (node.classList.contains("invite-music") ||
              node.classList.contains("invite-video-toggle"))
          ) {
            return false;
          }
          return true;
        },
      });

      // Initialize jsPDF document (A4 format)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const imgWidth = pdfWidth;
      const imgHeight = (img.height * pdfWidth) / img.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Page 1
      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;

      // Multi-page pagination
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pdfHeight;
      }

      pdf.save(filename);
      return filename;
    } catch (err) {
      throw new Error(
        `Direct PDF download failed: ${err.message}. Please use the "Print / Save as PDF" fallback button instead.`,
      );
    } finally {
      // Always restore DOM state
      if (orderSheet) {
        orderSheet.style.display = prevDisplay;
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

