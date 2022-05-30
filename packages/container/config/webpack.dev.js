const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        //marketing in quote must same name in name: "marketing"  in modulefederation in wepack config file
        //key marketing will called in import in container
      },
      // shared: ["react", "react-dom"],
      //share module in other App, create a copy file and share to other App to use(if other app use same major version)

      shared: packageJson.dependencies,
      //share automatic
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
