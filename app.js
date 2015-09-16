// Dependencies
var url = require('url');
var jsdom = require("jsdom");
var argv = require('minimist')(process.argv.slice(2));
var app = require('./lib/main.js');

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
        return links;
    }
);

for (i = 0; i < links.length; i++) {
    fullPath = app.getFullPath(
        folderName,
        'http://'+links[i].replace(/\/\//, '')
    );

    options = {
        url: href
    };

    app.downloadFile(options,fullPath);
}
