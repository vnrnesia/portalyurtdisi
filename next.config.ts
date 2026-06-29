import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern formatlar — next/image otomatik olarak AVIF/WebP servis eder
    formats: ["image/avif", "image/webp"],
    // Kullanılan kalite değerleri (next/image uyarılarını giderir)
    qualities: [75, 90, 100],
    // Optimize edilmiş görseller uzun süre cache'lensin
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
