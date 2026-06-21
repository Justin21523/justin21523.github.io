const githubPagesBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(src: string | undefined) {
  if (!src) {
    return src;
  }

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("//") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  if (!githubPagesBasePath) {
    return src;
  }

  if (src === githubPagesBasePath || src.startsWith(`${githubPagesBasePath}/`)) {
    return src;
  }

  return src.startsWith("/")
    ? `${githubPagesBasePath}${src}`
    : `${githubPagesBasePath}/${src}`;
}
