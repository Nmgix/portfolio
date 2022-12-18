/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["nmgix-components"]);

const nextConfig = withTM({
  reactStrictMode: true,
  webpack: (config, options) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules.push({
      test: /\\.+(ts|tsx)$/,
      include: [options.dir],
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: "ts-loader", options: { transpileOnly: true } }],
    });
    return config;
  },
});

module.exports = nextConfig;
