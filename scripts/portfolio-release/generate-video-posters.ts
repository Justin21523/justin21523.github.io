import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function findVideos(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return entry.name === "posters" ? [] : findVideos(fullPath);
    }

    return VIDEO_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
}

function posterPathForVideo(videoPath: string) {
  const videoDir = path.dirname(videoPath);
  const posterDir = path.join(videoDir, "posters");
  const posterName = `${path.basename(videoPath, path.extname(videoPath))}.webp`;

  return path.join(posterDir, posterName);
}

function projectDirForVideo(videoPath: string) {
  const relative = path.relative(PUBLIC_DIR, videoPath);
  const parts = relative.split(path.sep);

  if (parts[0] === "projects" && parts[1]) {
    return path.join(PUBLIC_DIR, "projects", parts[1]);
  }

  if (parts[0] === "portfolio" && parts[1] === "projects" && parts[2]) {
    return path.join(PUBLIC_DIR, "portfolio", "projects", parts[2]);
  }

  return path.dirname(videoPath);
}

function firstScreenshotForVideo(videoPath: string) {
  const screenshotDir = path.join(projectDirForVideo(videoPath), "screenshots");

  if (!fs.existsSync(screenshotDir)) {
    return undefined;
  }

  return fs
    .readdirSync(screenshotDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(png|jpe?g|webp)$/i.test(entry.name))
    .map((entry) => path.join(screenshotDir, entry.name))
    .sort()[0];
}

function repairVideoFromScreenshot(videoPath: string) {
  const screenshot = firstScreenshotForVideo(videoPath);

  if (!screenshot) {
    return false;
  }

  const extension = path.extname(videoPath).toLowerCase();
  const tempPath = `${videoPath}.tmp${extension}`;
  const videoArgs =
    extension === ".webm"
      ? [
          "-y",
          "-loop",
          "1",
          "-i",
          screenshot,
          "-t",
          "6",
          "-r",
          "30",
          "-vf",
          "scale=1280:-2,format=yuv420p",
          "-an",
          "-c:v",
          "libvpx-vp9",
          tempPath,
        ]
      : [
          "-y",
          "-loop",
          "1",
          "-i",
          screenshot,
          "-t",
          "6",
          "-r",
          "30",
          "-vf",
          "scale=1280:-2,format=yuv420p",
          "-an",
          "-c:v",
          "libx264",
          "-movflags",
          "+faststart",
          tempPath,
        ];

  // 壞掉的影片檔會讓 detail page 播放失敗；用已驗證截圖產生短展示片段作為可播放 fallback。
  const result = spawnSync("ffmpeg", videoArgs, {
    stdio: "pipe",
  });

  if (result.status === 0 && fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, videoPath);
    return true;
  }

  if (fs.existsSync(tempPath)) {
    fs.rmSync(tempPath);
  }

  return false;
}

function generatePoster(videoPath: string, posterPath: string) {
  ensureDir(path.dirname(posterPath));

  // 取影片一秒附近的畫面，避免第一幀剛好是黑畫面或載入狀態。
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-ss",
      "00:00:01",
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-vf",
      "scale=1280:-1",
      "-q:v",
      "70",
      posterPath,
    ],
    {
      stdio: "pipe",
    }
  );

  if (result.status === 0 && fs.existsSync(posterPath)) {
    return true;
  }

  if (fs.existsSync(posterPath)) {
    fs.rmSync(posterPath);
  }

  return false;
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log("No public directory found.");
    return;
  }

  const videos = findVideos(PUBLIC_DIR);
  let generated = 0;
  let skipped = 0;
  let repaired = 0;
  let failed = 0;

  videos.forEach((videoPath) => {
    const posterPath = posterPathForVideo(videoPath);

    if (fs.existsSync(posterPath)) {
      skipped += 1;
      return;
    }

    if (generatePoster(videoPath, posterPath)) {
      generated += 1;
      return;
    }

    if (repairVideoFromScreenshot(videoPath) && generatePoster(videoPath, posterPath)) {
      repaired += 1;
      generated += 1;
      return;
    }

    failed += 1;
    console.warn(`Failed to generate poster for ${path.relative(ROOT, videoPath)}`);
  });

  console.log(
    `Video poster generation complete: ${generated} generated, ${skipped} already present, ${repaired} repaired, ${failed} failed.`
  );

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main();
