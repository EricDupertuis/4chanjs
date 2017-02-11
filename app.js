#! /usr/bin/env node
'use strict';

let url = require('url');
let http = require('http');
let util = require('util');
let jsdom = require("jsdom");
let argv = require('minimist')(process.argv.slice(2));
let app = require('./lib/main.js');
let setMode = "600";
let thread;

if (typeof argv["u"] == "undefined" || argv["u"] == "") {
    console.log('No url given');
    process.exit(1);
} else {
    thread = argv["u"];
}

if (argv["_"] > 1) {
    console.log("Too many arguments");
    process.exit(0);
}
console.log(thread);
let urlInfo = url.parse(thread);

let options = {
    host: urlInfo['hostname'],
    port: 80,
    path: urlInfo['pathname']
};

let htmlContent = "";

let req = http.request(options, function(res) {
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

let threadName = urlInfo.pathname.split('/').pop();
let folderName = app.getFolderName(argv['f'], threadName);

app.generateDownloadFolder(folderName);

let links = jsdom.env(
    thread,
    [],
    function (err, window) {
        let links = [];
        let images = window.document.getElementsByClassName("fileThumb");
        for (let i = 0; i < images.length; i++) {
            links.push(images[i].getAttribute('href'));
        }

        links = app.excludePattern(links, argv);

        app.downloadAll(links, folderName, setMode);
    }
);

