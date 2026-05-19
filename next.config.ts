import type { NextConfig } from "next";
import Icons from "unplugin-icons/webpack";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || process.env.BUILD_LOCALE
    ? "/" + process.env.BUILD_LOCALE
    : "";

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
