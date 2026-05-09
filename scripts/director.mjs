import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve("data/projects.json");
const mediaDir = path.resolve("public/media/projects");
const baseUrl = "https://neojustin.dothost.net";

if (!fs.existsSync(projectsPath)) {
  console.error("Projects file not found.");
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

// Ensure media directory exists
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

async function captureProject(browser, project) {
  const slug = project.slug;
  let targetUrl = project.demoUrl;

  // Infer URL if missing, based on deployment convention
  if (!targetUrl && project.group === "web") {
    targetUrl = `${baseUrl}/p/${slug}/`;
  }

  // Skip if we still don't have a URL
  if (!targetUrl) {
    console.log(`[${slug}] No URL found, skipping.`);
    return null;
  }

  console.log(`[${slug}] detailed capture starting... URL: ${targetUrl}`);
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: mediaDir,
      size: { width: 1280, height: 720 },
    }
  });

  const page = await context.newPage();

  try {
    // 1. Visit URL with timeout
    await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 30000 });
    
    // 2. Take Screenshot
    const screenshotPath = path.join(mediaDir, `${slug}-screenshot.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    
    // 3. Perform Interactions for Video
    // Smooth scroll down
    await page.evaluate(async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const totalHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const distance = 100;
      
      // Scroll down
      for (let y = 0; y < Math.min(totalHeight - viewportHeight, 1500); y += distance) {
        window.scrollBy(0, distance);
        await delay(100);
      }
      
      await delay(1000); // Pause at bottom
      
      // Scroll up quickly
      window.scrollTo(0, 0);
      await delay(1000); // Pause at top
    });

    // Close page to save video
    await page.close();
    
    // Playwright saves video with random name, we need to rename it
    const videoFile = await page.video().path();
    const newVideoPath = path.join(mediaDir, `${slug}-demo.webm`);
    
    // Rename/Move video
    fs.renameSync(videoFile, newVideoPath);
    
    console.log(`[${slug}] Captured!`);
    
    return {
      image: `/media/projects/${slug}-screenshot.png`,
      video: `/media/projects/${slug}-demo.webm`
    };

  } catch (error) {
    console.error(`[${slug}] Failed: ${error.message}`);
    await page.close();
    return null;
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch();
  
  const updatedProjects = [];
  
  for (const project of projects) {
    // Only process if we haven't manually set a custom image/video that we want to keep?
    // For now, let's try to capture everything that has a URL.
    
    const result = await captureProject(browser, project);
    
    if (result) {
      updatedProjects.push({
        ...project,
        image: result.image,
        video: result.video
      });
    } else {
      updatedProjects.push(project);
    }
  }

  // Write back to projects.json
  fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));
  console.log("All projects processed. Updated projects.json");
  
  await browser.close();
}

main();
