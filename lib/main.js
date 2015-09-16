var exec = require('child_process').exec;
var http = require('http-request');

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
            throw err;
        } else {
            return true;
        }
    });
};

exports.generateUrlList = function()
{

};

exports.getFullPath = function (folderName, href) {
    splitted = href.splice("/");
    filename = splitted[splitted.length - 1];

    return folderName + "/" + filename;
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