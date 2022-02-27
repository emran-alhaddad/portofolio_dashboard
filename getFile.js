function getFileInfo(file, destination) {
    var extention = file.originalFilename.split(".").pop();
    var fileName = Date.now() + "-" + (Math.random() * 1e20) + "." + extention;
    var oldPath = file.filepath;
    var newPath = __dirname + destination + fileName;

    return {
        extention: extention,
        name: fileName,
        oldPath: oldPath,
        newPath: newPath
    }
}

module.exports = getFileInfo;