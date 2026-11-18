// news-image-20261117 — hand the poster over to the grader.
//
// The whole entry is one PNG. This script's only job is to put a copy of it
// in the output directory the grader reads from, and to report where it went.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const POSTER = "entry.png";

function publishPoster(): void {
  const source = resolve(import.meta.dirname, POSTER);
  if (!existsSync(source)) {
    throw new Error(`poster missing: expected ${source} to exist`);
  }

  const destinationDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const destination = join(destinationDir, POSTER);

  mkdirSync(destinationDir, { recursive: true });
  copyFileSync(source, destination);

  const bytes = statSync(destination).size;
  console.log(`copied ${source} -> ${destination} (${bytes} bytes)`);
}

publishPoster();
