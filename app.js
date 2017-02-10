#! /usr/bin/env node
'use strict';

var url = require('url');
var http = require('http');
var util = require('util');
var jsdom = require("jsdom");
var argv = require('minimist')(process.argv.slice(2));
var app = require('./lib/main.js');
var setMode = "600";

if (typeof argv["u"] == "undefined" || argv["u"] == "") {
    console.log('No url given');
    process.exit(1);
} else {
    var thread = argv["u"];
}

if (argv["_"] > 1) {
    console.log("Too many arguments");
    process.exit(0);
}

var urlInfo = url.parse(thread);

var options = {
    host: urlInfo['hostname'],
    port: 80,
    path: urlInfo['pathname']
};

var htmlContent = "";

var req = http.request(options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        htmlContent += chunk;
    });

    res.on("end", function () {
        util.log('html downloaded');
    });
}).on('error', function (e) {
    console.log(e.message);
});

req.end();

var threadName = urlInfo.pathname.split('/').pop();
var folderName = app.getFolderName(argv['f'], threadName);

app.generateDownloadFolder(folderName);

let links = jsdom.env(
    thread,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
        let links = [];
        let images = window.$(".postContainer .file .fileThumb");
        for (let i = 0; i < images.length; i++) {
            links.push(window.$(images[i]).attr('href'));
        }

        links = app.excludePattern(links, argv);

        app.downloadAll(links, folderName, setMode);
    }
);
