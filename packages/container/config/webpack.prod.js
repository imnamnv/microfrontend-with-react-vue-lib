const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // contenthash for cache
    publicPath: "/container/latest/", // add publicPath before filename in js tab -> /container/latest/main.js
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, // /marketing we deploy all of them to same origin url, not like localhost:8081,8082
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies, //share automatic
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
