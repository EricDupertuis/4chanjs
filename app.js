// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var jsdom = require("jsdom");
var exec = require('child_process').exec;

var thread = process.argv[2];
var host = url.parse(thread);
var folderName = host.pathname.split('/').pop();
var mkdir = 'mkdir -p ' + 'downloads/' + folderName;
var chmod = 'chmod -R 777 downloads/' + folderName;

var mkdirExec = exec(mkdir, function (err, stdout, stderr) {
    if (err) {
        throw err;
    } else {
        console.log('folder created');
    }
});
var chmodExec = exec(chmod, function (err, stdout, stderr) {
    if (err) {
        throw err;
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

           var request = http.get(href, function(res){
               var imagedata = '';
               res.setEncoding('binary');

               res.on('data', function(chunk){
                   imagedata += chunk
               });

               res.on('end', function(){
                   fs.writeFile(filename, imagedata, 'binary', function(err){
                       if (err) {
                           throw err
                       }
                       console.log(filename + ' saved.')
                   });
               })
           })
       }
    }
);

