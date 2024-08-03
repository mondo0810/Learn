/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
                minimumCacheTTL: 3600,
        },
        images: {
                remotePatterns: [
                        {
                                protocol: "https",
                                hostname: "placehold.co", // if your website has no www, drop it
                        },
                        {
                                protocol: "https",
                                hostname: "image.accrobloxtet.com",
                        },
                        {
                                protocol: "https",
                                hostname: "i.pravatar.cc",
                        },
                        {
                                protocol: "https",
                                hostname: "i.imgur.com",
                        },
                ],
        },
        experimental: {
                missingSuspenseWithCSRBailout: false,
        },
}

module.exports = nextConfig
