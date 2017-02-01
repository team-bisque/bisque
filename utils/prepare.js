var fileSystem = require("fs-extra"),
    path = require("path");

// clean de dist folder
fileSystem.emptyDirSync(path.join(__dirname, "../build"));

fileSystem.copySync(path.join(__dirname, "../src/images"), path.join(__dirname, "../build/images"))
fileSystem.copySync(path.join(__dirname, "../src/js/controllers/keyLogger.js"), path.join(__dirname, "../build/keyLogger.js"))

require("./generate_manifest");
