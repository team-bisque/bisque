'use strict';
const fileSystem 	= require("fs-extra"),
			archiver		= require("archiver"),
			pkg					=	require("../package.json");

const output 	= file_system.createWriteStream(`${pkg.name}.zip`),
			archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);
archive.directory('../build/');
archive.finalize();