import type { NextConfig } from "next";
import Icons from "unplugin-icons/webpack";

function normalizeBasePath(value: string): string {
  if (!value || value === "/") return "";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const localeBasePath = process.env.BUILD_LOCALE ? `/${process.env.BUILD_LOCALE}` : "";
const basePath = normalizeBasePath(explicitBasePath ?? localeBasePath);

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  allowedDevOrigins: ["172.23.168.73"],
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
        scale: 1,
      })
    );

    return config;
  },
};

export default nextConfig;
