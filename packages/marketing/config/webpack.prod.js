const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConjig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/marketing/latest/", // add publicPath before filename in js tab -> /container/latest/main.js
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConjig, prodConfig);
