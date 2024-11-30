/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  images: {
    unoptimized: true,
    domains: ["*"],
  },
  output: "export",
};

export default nextConfig;
