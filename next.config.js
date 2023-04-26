/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: isLogin?"/":"/auth/login",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
