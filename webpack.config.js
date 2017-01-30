var webpack     = require("webpack"),
    path        = require("path"),
    fileSystem  = require("fs"),
    env         = require("./utils/env"),
    pkg         = require("./package.json"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin   = require("write-file-webpack-plugin");
    // ZipPlugin         = require('zip-webpack-plugin');

// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;  
}

alias["manifest"] = path.join(__dirname, ("manifest.json"));
alias["logo"] = path.join(__dirname, ("logo.png"));

module.exports = {
  entry: {
    newtab: path.join(__dirname, "src", "js", "newtab.js"),
    options: path.join(__dirname, "src", "js", "options.js"),
    background: path.join(__dirname, "src", "js", "background.js")
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: "babel" },
      { test: /\.css$/, loaders: ["style", "css"] }
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
      template: path.join(__dirname, "src", "options.html"),
      filename: "options.html",
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"]
    }),
    new WriteFilePlugin(),
    // new ZipPlugin({
    //   filename: `${pkg.name}.zip`,
    //   // OPTIONAL: defaults an empty string 
    //   // the prefix for the files included in the zip file
    //   // pathPrefix: 'relative/path',  

    //   // OPTIONAL: defaults to including everything
    //   // can be a string, a RegExp, or an array of strings and RegExps
    //   // include: [/\.js$/, "./manifest.json", "./logo.png"],

    // })
  ]
};
