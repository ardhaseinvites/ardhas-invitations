/**
 * Media utility for handling photos, videos, and YouTube URLs across Ardhas Invitations.
 */

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "youtu.be",
]);

/**
 * Parses any YouTube link format and extracts metadata (ID, embed URL, thumbnail).
 *
 * Supported formats:
 * - https://www.youtube.com/watch?v=aqz-KE-bpKQ
 * - https://youtu.be/aqz-KE-bpKQ
 * - https://www.youtube.com/embed/aqz-KE-bpKQ
 * - https://www.youtube.com/shorts/aqz-KE-bpKQ
 * - https://m.youtube.com/watch?v=aqz-KE-bpKQ&t=4s
 * - https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ
 *
 * @param {string} input - URL or raw video ID
 * @returns {{
 *   isYouTube: boolean,
 *   videoId: string | null,
 *   embedUrl: string | null,
 *   thumbnailUrl: string | null,
 *   maxresThumbnailUrl: string | null,
 *   standardUrl: string | null
 * }}
 */
export function parseYouTubeUrl(input) {
  if (!input || typeof input !== "string") {
    return {
      isYouTube: false,
      videoId: null,
      embedUrl: null,
      thumbnailUrl: null,
      maxresThumbnailUrl: null,
      standardUrl: null,
    };
  }

  const trimmed = input.trim();

  // If user pasted just an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return createYouTubeMetadata(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();

    if (!YOUTUBE_HOSTS.has(hostname)) {
      return {
        isYouTube: false,
        videoId: null,
        embedUrl: null,
        thumbnailUrl: null,
        maxresThumbnailUrl: null,
        standardUrl: null,
      };
    }

    let id = null;

    if (hostname === "youtu.be") {
      id = parsed.pathname.replace(/^\/+/, "").split("/")[0];
    } else {
      // Check query parameter ?v=
      const v = parsed.searchParams.get("v");
      if (v) {
        id = v;
      } else {
        // Check /embed/ID or /shorts/ID or /v/ID
        const match = parsed.pathname.match(/^\/(?:embed|shorts|v)\/([a-zA-Z0-9_-]+)/);
        if (match) {
          id = match[1];
        }
      }
    }

    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return createYouTubeMetadata(id);
    }
  } catch {
    // Not a valid URL
  }

  return {
    isYouTube: false,
    videoId: null,
    embedUrl: null,
    thumbnailUrl: null,
    maxresThumbnailUrl: null,
    standardUrl: null,
  };
}

function createYouTubeMetadata(id) {
  return {
    isYouTube: true,
    videoId: id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    maxresThumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    standardUrl: `https://www.youtube.com/watch?v=${id}`,
  };
}

/**
 * Checks if a URL represents a video (YouTube, hosted MP4/WebM, or browser blob).
 * @param {string} input
 * @returns {boolean}
 */
export function isVideoUrl(input) {
  if (!input || typeof input !== "string") return false;
  const trimmed = input.trim();
  if (trimmed.startsWith("blob:")) return true;
  if (parseYouTubeUrl(trimmed).isYouTube) return true;
  if (/\.(mp4|webm|ogv)(\?.*)?$/i.test(trimmed)) return true;
  return false;
}

/**
 * Returns the effective visual thumbnail for any media input.
 * If YouTube, returns the YouTube high-resolution thumbnail.
 * Otherwise returns the original image URL or empty string.
 * @param {string} input
 * @returns {string}
 */
export function getMediaThumbnail(input) {
  if (!input || typeof input !== "string") return "";
  const yt = parseYouTubeUrl(input);
  if (yt.isYouTube && yt.thumbnailUrl) {
    return yt.thumbnailUrl;
  }
  return input;
}

/**
 * Inspects a media input string and returns its media classification.
 * @param {string} input
 * @returns {'empty' | 'youtube' | 'video' | 'image'}
 */
export function getMediaDisplayType(input) {
  if (!input || typeof input !== "string" || !input.trim()) return "empty";
  const trimmed = input.trim();
  const yt = parseYouTubeUrl(trimmed);
  if (yt.isYouTube) return "youtube";
  if (trimmed.startsWith("blob:") || /\.(mp4|webm|ogv)(\?.*)?$/i.test(trimmed)) {
    return "video";
  }
  return "image";
}

export default {
  parseYouTubeUrl,
  isVideoUrl,
  getMediaThumbnail,
  getMediaDisplayType,
};
