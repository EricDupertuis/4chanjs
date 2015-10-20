#! /usr/bin/env node
var url = require('url');
var http = require('http');
var jsdom = require("jsdom");
var argv = require('minimist')(process.argv.slice(2));
var app = require('./lib/main.js');
var cheerio = require('cheerio');

if (typeof argv["u"] == "undefined" || argv["u"] == "") {
    console.log('No url given');
    process.exit(1);
}

var thread = argv["u"];

if (argv["_"] > 1) {
    console.log("Too many arguments");
    process.exit(0);
}

var options = {
    host: thread,
    port: 80,
    path: "/"
};

var htmlContent = "";

var req = http.request(options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        content += chunk;
    });

    res.on("end", function () {
        util.log(content);
    });
});

req.end();

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

        if (typeof argv['noanimation'] != "undefined"){
            links = app.excludePattern(links, 'gif');
            links = app.excludePattern(links, 'webm')
        } else if (typeof argv['e'] != "undefined" && argv['e'] != "") {
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
