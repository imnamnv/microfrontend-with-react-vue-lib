const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/", //because in this app we use nested route -> it will load main.js in auth/main.js-> wrong
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html", //add / because error 404 rotfont route
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "auth", //name will called in container
      filename: "remoteEntry.js", //set name of url file want to load in container
      exposes: {
        "./AuthApp": "./src/bootstrap", //set path of file want to import in container(marketing/MarketingApp instead marketing/src/bootstrap)
      },
      // shared: ["react", "react-dom"],
      //share module in other App, create a copy file and share to other App to use(if other app use same major version)
      //with share, this module will be loaded async, this is reason we use index.js to import("xxx") in "RemoteApp"

      shared: packageJson.dependencies,
      //share automatic
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
