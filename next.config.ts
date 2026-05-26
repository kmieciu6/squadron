import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cms.squadron.com.pl",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;