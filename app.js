// Dependencies
var url = require('url');
var http = require('http-request');
var jsdom = require("jsdom");
var exec = require('child_process').exec;
var argv = require('minimist')(process.argv.slice(2));

var app = require('./lib/main.js');

var thread = process.argv[2];
var host = url.parse(thread);
var folderName = host.pathname.split('/').pop();


var mkdirExec = exec(app.generateDownloadFolder(argv['f']), function (err, stdout, stderr) {
    if (err) {
        throw err;
    } else {
        console.log('folder created');
    }
});

var links = [];

jsdom.env(
    thread,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
        images = window.$(".postContainer .file .fileThumb");
        for (i = 0; i < images.length; i++) {
            links.push(window.$(images[i]).attr('href'));
        }
       for (i = 0; i < links.length;i++) {
           href = 'http://'+links[i].replace(/\/\//, '');
           splitted = href.split("/");
           filename = splitted[splitted.length - 1];
           fullPath = 'downloads/' + folderName + '/' + filename;

           options = {url: href};

           http.get(options, fullPath, function (error, result) {
               if (error) {
                   console.error(error);
               } else {
                   console.log('File downloaded at: ' + result.file);
               }
           });
       }
    }
);

