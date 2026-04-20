#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const workspaceDir = process.cwd();
const builtAssetsDir = path.join(workspaceDir, "dist", "public", "_build");
const publicAssetsDir = path.join(workspaceDir, "public", "_build");

async function main() {
  await fs.access(builtAssetsDir);
  await fs.rm(publicAssetsDir, { recursive: true, force: true });
  await fs.mkdir(path.dirname(publicAssetsDir), { recursive: true });
  await fs.cp(builtAssetsDir, publicAssetsDir, { recursive: true });
  console.log(`Synced ${builtAssetsDir} -> ${publicAssetsDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exit(1);
});
