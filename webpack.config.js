var webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./utils/env"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");

// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

module.exports = {
  entry: {
    newtab: path.join(__dirname, "src", "js", "newtab.js"),
    background: path.join(__dirname, "src", "js", "background.js"),
    popup: path.join(__dirname, "src", "js", "popup.js")
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel" },
      { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'file?name=[name].[ext]' },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.css$/, loaders: ['style', 'css'] },
    ]
  },
  resolve: {
    alias: alias,
    extensions: ["", ".js", ".jsx", ".css"]
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({ "process.env": JSON.stringify(env) }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "newtab.html"),
      filename: "newtab.html",
      chunks: ["newtab"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new WriteFilePlugin()
  ]
};
