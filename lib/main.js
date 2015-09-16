exports.generateDownloadFolder = function(folder, thread)
{
    if (typeof folder == 'undefined' || folder == "") {
        return 'mkdir -p ' + 'downloads/' + thread;
    } else {
        return 'mkdir -p ' + folder;
    }
};

exports.generateUrlList = function()
{

};

exports.downloadFile = function(url)
{

};