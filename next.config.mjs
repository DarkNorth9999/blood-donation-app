import withPWAInit from "@ducanh2912/next-pwa"

const withPWA = withPWAInit({
  dest: "public",
})

// cacheOnFrontEndNav: true,
//   reloadOnOnline: true,
//   swcMinify:true,

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dyeeocktp/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "mighty.tools",
        port: "",
        pathname: "/mockmind-api/**",
      },
    ],
  },
}

export default withPWA(nextConfig)
