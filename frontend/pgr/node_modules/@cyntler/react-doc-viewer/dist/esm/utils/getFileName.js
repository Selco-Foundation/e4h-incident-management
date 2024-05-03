export var getFileName = function (document, retainURLParams) {
    if (!document) {
        return "";
    }
    var fileName = "";
    if (document.fileName) {
        fileName = document.fileName;
    }
    else {
        fileName = document.uri || "";
        fileName = decodeURI(fileName);
        if (!retainURLParams) {
            fileName = fileName.split("?")[0];
        }
        var splitURL = fileName.split("/");
        if (splitURL.length) {
            fileName = splitURL[splitURL.length - 1];
        }
    }
    return fileName;
};
