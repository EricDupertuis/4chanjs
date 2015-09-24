var exec = require('child_process').exec;
var http = require('http-request');
var url = require('url');

exports.getFolderName = function(arg, threadName) {
    if (typeof arg == 'undefined' || arg == "") {
        return threadName;
    } else {
        return arg;
    }
};

exports.generateDownloadFolder = function(folder)
{
    exec('mkdir -p ' + folder, function (err, stdout, stderr) {
        if (err) {
            console.log('Impossible to create the folder. Do you have write access in the current folder ?');
            process.exit(0);
        } else {
            return true;
        }
    });
};

exports.getFullPath = function (folderName, href) {
    var splited = href.split("/");
    var filename = splited[splited.length - 1];

    return "./" + folderName + "/" + filename;
};

exports.downloadFile = function(httpOptions, fullPath)
{
    http.get(httpOptions, fullPath, function (error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log('File downloaded at: ' + result.file);
        }
    });
};

exports.excludePattern = function(links, pattern)
{
    //TODO must finish functions
    for (var i = 0; i < links.length; i++) {
        path = links[i].split('.');

        if (path[path.length - 1] == pattern) {
            links.splice(i, 1);
        }
    }
    return links;
};