const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html", //add / because error 404 rotfont route
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        //marketing in quote must same name in name: "marketing"  in modulefederation in wepack config file
        //key marketing will called in import in container
        auth: "auth@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
      //share module in other App, create a copy file and share to other App to use(if other app use same major version)

      shared: packageJson.dependencies,
      //share automatic
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
