import { templates } from "./events.js";

/**
 * Validates a Project ID.
 * Rule: lowercase letters, numbers, hyphens; 3 to 40 characters; no spaces.
 * Format regex: ^[a-z0-9-]{3,40}$
 */
export function validateProjectId(projectId) {
  if (!projectId || typeof projectId !== "string") {
    return { valid: false, error: "Project ID is required." };
  }
  const trimmed = projectId.trim();
  if (trimmed.length < 3 || trimmed.length > 40) {
    return {
      valid: false,
      error: "Project ID must be between 3 and 40 characters.",
    };
  }
  if (!/^[a-z0-9-]+$/.test(trimmed)) {
    return {
      valid: false,
      error:
        "Project ID can only contain lowercase letters, numbers, and hyphens (no spaces or uppercase).",
    };
  }
  return { valid: true, error: "" };
}

/**
 * Validates a Custom Field ID.
 * Format: lower_snake (e.g. grooms_grandfather, mahurat_time).
 * Regex: ^[a-z][a-z0-9_]*$
 */
export function validateCustomFieldId(id, existingIds = []) {
  if (!id || typeof id !== "string" || !id.trim()) {
    return { valid: false, error: "Field ID cannot be empty." };
  }
  const trimmed = id.trim();
  if (!/^[a-z][a-z0-9_]*$/.test(trimmed)) {
    return {
      valid: false,
      error:
        "Field ID must be in lower_snake format (starts with lowercase letter, followed by lowercase letters, digits, or underscores).",
    };
  }
  if (existingIds.includes(trimmed)) {
    return {
      valid: false,
      error: `Field ID "${trimmed}" already exists. IDs must be unique.`,
    };
  }
  return { valid: true, error: "" };
}

/**
 * Static slots present across all templates.
 */
const BASE_MEDIA_SLOTS = [
  {
    id: "HERO_IMAGE",
    label: "Welcome / Hero Photograph",
    type: "image",
    required: true,
    section: "Hero",
    recommendedAspectRatio: "16:9 or 3:2 landscape (min 1400x900px)",
    description: "Main welcome photograph used as the hero background.",
    configKey: "heroImage",
  },
  {
    id: "HERO_VIDEO",
    label: "Welcome Background Video",
    type: "video",
    required: false,
    section: "Hero",
    recommendedAspectRatio: "16:9 landscape MP4/WebM",
    description: "Muted, looping background video for the hero section.",
    configKey: "heroVideoUrl",
  },
  {
    id: "BACKGROUND_IMAGE",
    label: "Custom Background Texture / Pattern",
    type: "image",
    required: false,
    section: "Page Background",
    recommendedAspectRatio: "16:9 or seamless vertical pattern",
    description: "Active when Background style is set to Custom Image.",
    configKey: "image",
  },
  {
    id: "VIDEO_POSTER",
    label: "Video Cover Poster",
    type: "image",
    required: false,
    section: "Video Section",
    recommendedAspectRatio: "16:9 landscape (min 1200x675px)",
    description: "Cover image displayed before the celebration video plays.",
    configKey: "videoPoster",
  },
  {
    id: "WEDDING_VIDEO",
    label: "Celebration / Invitation Video",
    type: "video",
    required: false,
    section: "Video Section",
    recommendedAspectRatio: "16:9 landscape (YouTube link or MP4)",
    description: "The main invitation film displayed in the video section.",
    configKey: "videoUrl",
  },
];

/**
 * Returns the complete list of media slots for a given configuration or template.
 * Slots include base template slots and gallery slots matching the gallery items count.
 */
export function getMediaSlots(configOrOptions = {}) {
  const eventType = configOrOptions.eventType || "Wedding";
  const galleryCount = Array.isArray(configOrOptions.gallery)
    ? configOrOptions.gallery.length
    : typeof configOrOptions.galleryCount === "number"
      ? configOrOptions.galleryCount
      : 3;

  // Clone base slots, customizing label if not a wedding
  const videoLabel =
    eventType === "Wedding"
      ? "Wedding Invitation Film"
      : `${eventType} Celebration Video`;

  const slots = BASE_MEDIA_SLOTS.map((slot) => {
    if (slot.id === "WEDDING_VIDEO") {
      return {
        ...slot,
        label: videoLabel,
      };
    }
    return { ...slot };
  });

  // Dynamically generate GALLERY_IMAGE_01, GALLERY_IMAGE_02, etc.
  for (let i = 1; i <= Math.max(galleryCount, 1); i++) {
    const padded = String(i).padStart(2, "0");
    slots.push({
      id: `GALLERY_IMAGE_${padded}`,
      label: `Gallery Photograph ${i}`,
      type: "image",
      required: false,
      section: "Gallery",
      recommendedAspectRatio: "3:2 or 4:3 (min 1200x800px)",
      description: `Photograph ${i} displayed in the photo gallery masonry and slider.`,
      configKey: "gallery",
      galleryIndex: i - 1,
    });
  }

  // Validate that all slots are strictly unique
  const seen = new Set();
  for (const s of slots) {
    if (seen.has(s.id)) {
      throw new Error(`Duplicate slot ID detected: ${s.id}`);
    }
    seen.add(s.id);
  }

  return slots;
}

/**
 * Get expected filename for a slot and project ID.
 * Format: <project-id>_<SLOT_ID>.<ext>
 */
export function getExpectedMediaFilename(projectId, slotId, ext = "jpg") {
  const safeProject = projectId ? projectId.trim() : "project";
  const cleanExt = ext.replace(/^\./, "");
  return `${safeProject}_${slotId}.${cleanExt}`;
}

/**
 * Inspects a config and returns slot statuses:
 * - 'provided_locally' (data: URL or blob: URL)
 * - 'url' (http/https URL)
 * - 'empty'
 */
export function getSlotStatus(slot, config = {}) {
  let value = "";
  if (slot.configKey === "gallery" && typeof slot.galleryIndex === "number") {
    value = config.gallery?.[slot.galleryIndex]?.src || "";
  } else if (slot.configKey) {
    value = config[slot.configKey] || "";
  }

  if (!value) return "empty";
  if (value.startsWith("data:") || value.startsWith("blob:")) {
    return "provided_locally";
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return "url";
  }
  return "empty";
}

export default {
  validateProjectId,
  validateCustomFieldId,
  getMediaSlots,
  getExpectedMediaFilename,
  getSlotStatus,
};

