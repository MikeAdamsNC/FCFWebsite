/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  serverExternalPackages: [
    "@google-cloud/firestore",
    "@google-cloud/storage",
    "google-gax",
    "google-auth-library",
    "bcryptjs",
  ],
};

module.exports = nextConfig;
