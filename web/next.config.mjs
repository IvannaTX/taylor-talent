import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  "https://assets.calendly.com",
];

if (process.env.NODE_ENV === "development") {
  scriptSources.push("'unsafe-eval'");
}

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self' https:",
  "font-src 'self' data: https://assets.calendly.com",
  "form-action 'self' https://calendly.com https://*.calendly.com",
  "frame-ancestors 'self'",
  "frame-src https://calendly.com https://*.calendly.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "object-src 'none'",
  `script-src ${scriptSources.join(" ")}`,
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  /**
   * This repo holds two apps, each with its own lockfile. Without this, Next
   * infers the workspace root from the *root* lockfile and traces the Astro
   * app's files into this build's output. Pin it to web/.
   */
  outputFileTracingRoot: here,
};

export default nextConfig;
