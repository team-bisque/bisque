var fileSystem = require("fs-extra"),
    path = require("path");

// clean de dist folder
fileSystem.emptyDirSync(path.join(__dirname, "../build"));

fileSystem.copySync(path.join(__dirname, "../src/images/logo.png"), path.join(__dirname, "../build/logo.png"))

require("./generate_manifest");
