// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var request = require('request');
var jsdom = require("jsdom");
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var thread = process.argv[2];
var host = url.parse(thread);
var folderName = host.pathname.split('/').pop();
var mkdir = 'mkdir -p ' + folderName;

var child = exec(mkdir, function (err, stdout, stderr) {
    if (err) {
        throw err;
    } else {
        console.log('folder created');
    }
});

var file = fs.createWriteStream(folderName + '/' + folderName + '.html');

jsdom.env(
    thread,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
        links = [];
        elements = window.$(".postContainer .file .fileThumb");
        console.log(elements.length);
        for (i = 0; i < elements.length ;i++) {
            console.log(window.$(elements[i]).attr('href'));
        }
    }
);