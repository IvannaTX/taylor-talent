import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * This repo holds two apps, each with its own lockfile. Without this, Next
   * infers the workspace root from the *root* lockfile and traces the Astro
   * app's files into this build's output. Pin it to web/.
   */
  outputFileTracingRoot: here,
};

export default nextConfig;
