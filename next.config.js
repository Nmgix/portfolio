/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["nmgix-components"]);

const nextConfig = withTM({
  reactStrictMode: false,
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
  },
});

module.exports = nextConfig;
