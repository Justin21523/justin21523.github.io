export function canPlayVideo(src) {
  if (!src || typeof document === "undefined") return true;
  const video = document.createElement("video");
  const lower = String(src).toLowerCase();
  if (lower.endsWith(".webm")) {
    return Boolean(video.canPlayType("video/webm") || video.canPlayType("video/webm; codecs=\"vp8, vorbis\""));
  }
  if (lower.endsWith(".mp4")) {
    return Boolean(video.canPlayType("video/mp4") || video.canPlayType("video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\""));
  }
  return true;
}
