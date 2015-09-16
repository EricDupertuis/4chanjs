// Dependencies
var url = require('url');
var http = require('http-request');
var jsdom = require("jsdom");
var exec = require('child_process').exec;
var argv = require('minimist')(process.argv.slice(2));
var app = require('./lib/main.js');

var thread = argv["_"][0];
var host = url.parse(thread);
var threadName = host.pathname.split('/').pop();

exec(app.generateDownloadFolder(argv['f'], threadName), function (err, stdout, stderr) {
    if (err) {
        throw err;
    } else {
        console.log('folder created');
    }
});

dom = jsdom.env(

);

links = jsdom.env(
    thread,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
        var links = [];
        images = window.$(".postContainer .file .fileThumb");
        for (i = 0; i < images.length; i++) {
            links.push(window.$(images[i]).attr('href'));
        }
        return links;
    }
);

for (i = 0; i < links.length; i++) {
    href = 'http://'+links[i].replace(/\/\//, '');
    splitted = href.split("/");
    filename = splitted[splitted.length - 1];
    fullPath = argv['f'] + '/' + filename;

    options = {url: href};

    http.get(options, fullPath, function (error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log('File downloaded at: ' + result.file);
        }
    });
}
