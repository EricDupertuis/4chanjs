function generateDownloadFolder() {
    if (typeof argv['f'] == 'undefined' || argv['f'] == "") {
        return 'mkdir -p ' + 'downloads/' + folderName;
    } else {
        return 'mkdir -p ' + argv['f'];
    }
}

function generateUrlList()
{

}

function downloadFile(url)
{

}