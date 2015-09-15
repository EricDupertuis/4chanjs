module.exports = {
    generateDownloadFolder:function(folder) {
        if (typeof folder == 'undefined' || folder == "") {
            return 'mkdir -p ' + 'downloads/' + folderName;
        } else {
            return 'mkdir -p ' + folder;
        }
    },

    generateUrlList:function()
    {

    },

    downloadFile:function(url)
    {

    }
};