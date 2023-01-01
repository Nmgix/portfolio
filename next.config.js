/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["nmgix-components"]);

const isProd = process.env.NODE_ENV === "production";

const nextConfig = withTM({
  reactStrictMode: false,
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
  },
  publicRuntimeConfig: {
    HCAPTCHA_SITEKEY: process.env.HCAPTCHA_SITEKEY,
  },
  // assetPrefix: isProd ? "/portfolio/" : "",
  // basePath: isProd ? "/portfolio" : "",
});

module.exports = nextConfig;
