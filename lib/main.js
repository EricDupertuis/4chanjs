var exec = require('child_process').exec;
var Download = require('download');

let main = {
    getFolderName: (arg, threadName) => {
        if (typeof arg == 'undefined' || arg == "") {
            return threadName;
        } else {
            return arg;
        }
    },


    generateDownloadFolder: (folder) => {
        exec('mkdir -p ' + folder, function (err, stdout, stderr) {
            if (err) {
                console.log('Impossible to create the folder. Do you have write access in the current folder ?');
                process.exit(0);
            } else {
                return true;
            }
        });
    },


    getFullPath: (folderName, href) => {
        var splited = href.split("/");
        var filename = splited[splited.length - 1];

        return "./" + folderName + "/" + filename;
    },


    downloadFile: (url, dest, mode) => {
        new Download({mode: mode.toString()})
            .get(url)
            .dest(dest)
            .run();
    },

    downloadAll: (links, folderName, mode) => {
        for (i = 0; i < links.length; i++) {
            if (typeof links[i] != "undefined") {
                href = 'http://'+links[i].replace(/\/\//, '');
                this.downloadFile(href, folderName, mode);
            }
        }
    },


    excludePattern: (links, argv) => {
        if (typeof argv['noanimation'] != 'undefined' && argv['noanimation'] == true) {
            for (var i = 0; i < links.length; i++) {
                path = links[i].split('.');
                if (path[path.length - 1] == 'gif' || path[path.length - 1] == 'webm') {
                    delete links[i];
                }
            }
        }

        if (typeof argv['e'] != undefined && argv['e'] != '') {
            for (var i = 0; i < links.length; i++) {
                path = links[i].split('.');
                if (path[path.length - 1] == argv['e']) {
                    delete links[i];
                }
            }
        }
        return links;
    }
}

module.exports = main;
