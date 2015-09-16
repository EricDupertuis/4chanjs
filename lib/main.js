var exec = require('child_process').exec;

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

exports.downloadFile = function(url)
{

};