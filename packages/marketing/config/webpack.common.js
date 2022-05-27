module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // file extra with mjs or js, we want to be process by babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], //[babel will process jsx file, change esxxx to es5] -- need confirm
            plugins: ["@babel/plugin-transform-runtime"], //add some code to run new feature like async await -- need confirm
          },
        },
      },
    ],
  },
};
