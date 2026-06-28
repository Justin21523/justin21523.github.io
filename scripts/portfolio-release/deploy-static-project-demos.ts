import { execFileSync } from "child_process";

const args = process.argv.slice(2).filter((arg) => arg !== "--all");

execFileSync(
  "tsx",
  [
    "scripts/portfolio-release/deploy-real-web-app-demos.ts",
    "--force-demo-app",
    ...args,
  ],
  {
    stdio: "inherit",
  }
);
