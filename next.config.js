/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["nmgix-components"]);

const nextConfig = withTM({
  reactStrictMode: false,
});

module.exports = nextConfig;
