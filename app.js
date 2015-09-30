#! /usr/bin/env node
var url = require('url');
var jsdom = require("jsdom");
var argv = require('minimist')(process.argv.slice(2));
var app = require('./lib/main.js');

if (typeof argv["_"][0] == "undefined" || argv["_"][0] == "") {
    console.log('No url given');
    process.exit(1);
}

var thread = argv["_"][0];
var host = url.parse(thread);
var threadName = host.pathname.split('/').pop();
folderName = app.getFolderName(argv['f'], threadName);

app.generateDownloadFolder(folderName);

links = jsdom.env(
    thread,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
        var links = [];
        images = window.$(".postContainer .file .fileThumb");
        for (i = 0; i < images.length; i++) {
            links.push(window.$(images[i]).attr('href'));
        }

        if (typeof argv['e'] != "undefined" && argv[''] != "") {
            links = app.excludePattern(links, argv['e']);
        }

        for (i = 0; i < links.length; i++) {
            if (typeof links[i] != "undefined") {
                href = 'http://'+links[i].replace(/\/\//, '');

                app.downloadFile(
                    {
                        url: href
                    },
                    app.getFullPath(folderName, href)
                );
            }
        }
    }
);
