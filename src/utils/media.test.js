import test from "node:test";
import assert from "node:assert/strict";
import {
  parseYouTubeUrl,
  isVideoUrl,
  getMediaThumbnail,
  getMediaDisplayType,
} from "./media.js";

test("parseYouTubeUrl parses standard youtube.com watch URLs", () => {
  const result = parseYouTubeUrl("https://www.youtube.com/watch?v=aqz-KE-bpKQ");
  assert.equal(result.isYouTube, true);
  assert.equal(result.videoId, "aqz-KE-bpKQ");
  assert.equal(result.thumbnailUrl, "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg");
  assert.equal(result.embedUrl, "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0");
  assert.equal(result.standardUrl, "https://www.youtube.com/watch?v=aqz-KE-bpKQ");
});

test("parseYouTubeUrl parses youtu.be short URLs", () => {
  const result = parseYouTubeUrl("https://youtu.be/aqz-KE-bpKQ?feature=shared");
  assert.equal(result.isYouTube, true);
  assert.equal(result.videoId, "aqz-KE-bpKQ");
  assert.equal(result.thumbnailUrl, "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg");
});

test("parseYouTubeUrl parses /embed/ and /shorts/ URLs", () => {
  const embed = parseYouTubeUrl("https://www.youtube.com/embed/aqz-KE-bpKQ");
  assert.equal(embed.isYouTube, true);
  assert.equal(embed.videoId, "aqz-KE-bpKQ");

  const shorts = parseYouTubeUrl("https://www.youtube.com/shorts/aqz-KE-bpKQ");
  assert.equal(shorts.isYouTube, true);
  assert.equal(shorts.videoId, "aqz-KE-bpKQ");
});

test("parseYouTubeUrl returns isYouTube: false for normal image or website URLs", () => {
  assert.equal(parseYouTubeUrl("https://images.unsplash.com/photo-1519741497674-611481863552").isYouTube, false);
  assert.equal(parseYouTubeUrl("https://example.com/video.mp4").isYouTube, false);
  assert.equal(parseYouTubeUrl("").isYouTube, false);
  assert.equal(parseYouTubeUrl(null).isYouTube, false);
});

test("isVideoUrl correctly detects YouTube links, MP4 URLs, and blob objects", () => {
  assert.equal(isVideoUrl("https://www.youtube.com/watch?v=aqz-KE-bpKQ"), true);
  assert.equal(isVideoUrl("https://youtu.be/aqz-KE-bpKQ"), true);
  assert.equal(isVideoUrl("https://cdn.example.com/trailer.mp4"), true);
  assert.equal(isVideoUrl("https://cdn.example.com/trailer.webm?token=123"), true);
  assert.equal(isVideoUrl("blob:http://localhost:5173/uuid-1234"), true);

  assert.equal(isVideoUrl("https://images.unsplash.com/photo-1519741497674-611481863552"), false);
  assert.equal(isVideoUrl("data:image/jpeg;base64,/9j/4AAQSkZJRg=="), false);
});

test("getMediaThumbnail returns YouTube thumbnail for YouTube URLs and original for others", () => {
  assert.equal(
    getMediaThumbnail("https://www.youtube.com/watch?v=aqz-KE-bpKQ"),
    "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
  );
  assert.equal(
    getMediaThumbnail("https://images.unsplash.com/sample.jpg"),
    "https://images.unsplash.com/sample.jpg",
  );
  assert.equal(getMediaThumbnail(""), "");
});

test("getMediaDisplayType classifies inputs accurately", () => {
  assert.equal(getMediaDisplayType("https://www.youtube.com/watch?v=aqz-KE-bpKQ"), "youtube");
  assert.equal(getMediaDisplayType("https://example.com/wedding.mp4"), "video");
  assert.equal(getMediaDisplayType("https://images.unsplash.com/photo.jpg"), "image");
  assert.equal(getMediaDisplayType("data:image/png;base64,..."), "image");
  assert.equal(getMediaDisplayType(""), "empty");
});
