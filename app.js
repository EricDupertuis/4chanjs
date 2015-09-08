// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var request = require('request');
var jsdom = require("jsdom");
var exec = require('child_process').exec;
var jquery = require('jquery');
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

var download = function (url, dest) {
    var file = fs.createWriteStream(dest + '/' + links[i]);
};

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
           url = 'http://'+links[i].replace(/\/\//, '')
           console.log(url);
       }
    }
);

