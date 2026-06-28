import type {
  Project,
  ProjectMedia,
} from "@/types/projects";

export function getPrimaryVideoMedia(media: ProjectMedia[]) {
  return media.find((item) => item.type === "video" && !item.placeholder && item.poster) ??
    media.find((item) => item.type === "video" && !item.placeholder) ??
    media.find((item) => item.type === "video");
}

export function getPrimaryImageMedia(media: ProjectMedia[]) {
  return media.find((item) => item.type === "image" && item.featured && !item.placeholder) ??
    media.find((item) => item.type === "image" && !item.placeholder) ??
    media.find((item) => item.type === "image");
}

export function getProjectThumbnailSource(project: Project) {
  const primaryVideo = getPrimaryVideoMedia(project.media);
  const primaryImage = getPrimaryImageMedia(project.media);

  return primaryVideo?.poster ??
    primaryImage?.src ??
    project.coverImage ??
    project.heroImage;
}

export function getProjectThumbnailMedia(project: Project) {
  const primaryVideo = getPrimaryVideoMedia(project.media);

  if (primaryVideo?.poster) {
    return primaryVideo;
  }

  return getPrimaryImageMedia(project.media);
}

export function getProjectPreviewMedia(project: Project) {
  return getPrimaryVideoMedia(project.media) ??
    getPrimaryImageMedia(project.media);
}

export function getVideoFirstMedia(media: ProjectMedia[]) {
  return [...media].sort((a, b) => {
    const videoDelta =
      Number(b.type === "video") -
      Number(a.type === "video");

    if (videoDelta !== 0) {
      return videoDelta;
    }

    const featuredDelta =
      Number(Boolean(b.featured)) -
      Number(Boolean(a.featured));

    if (featuredDelta !== 0) {
      return featuredDelta;
    }

    return 0;
  });
}

export function getMediaPreviewSource(item: ProjectMedia, fallbackPoster: string | undefined) {
  if (item.type === "video") {
    return item.poster ?? fallbackPoster;
  }

  return item.src;
}
