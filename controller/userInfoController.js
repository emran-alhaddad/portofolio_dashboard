var formidable = require('formidable');
const fs = require('fs');
const userInfo = require('../model/userInfoModel');
const getFileInfo = require('../getFile');

const showUserInfo = (req, res) => {
    userInfo.findOne({}, (err, data) => {
        if (err) console.log(err);
        res.render('home', { userInfo: data });
    })

};

const editUserInfo = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            userInfo.updateOne({ id: fields._id.toString() }, fields, { returnDocument: 'after' }, function(err) {
                if (err) return handleError(err);
                console.log(new Date().toLocaleString(), "USerInfo Updated Success")
            });
        }

    });

    // 
}

const editUserImage = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (files) {
            var avater = getFileInfo(files.avater, '\\Assets\\uploads\\');
            if (avater.extention === "jpg") {
                fs.rename(avater.oldPath, avater.newPath, () => {});
                userInfo.updateOne({ id: fields._id.toString() }, { avater: avater.name }, { returnDocument: 'after' }, function(err) {
                    if (err) return handleError(err);
                    console.log(new Date().toLocaleString(), "Avater Updated Success")
                });

                res.redirect('/');
            } else
                res.write(`
                <script>
                    alert("Avater Must be JPG"); 
                    window.location.pathname = "/";
                </script>`);

        }


        // res.write(`
        // <script>
        // $("#doneEditUserInfo").modal('show');
        // </script>
        // `);
        // res.end();


    });

    // 
}

const deleteUserImage = (req, res) => {

    userInfo.findOne({}, (err, data) => {

        if (err) console.log(err);
        var avater = __dirname.split("\\");
        avater.pop();
        avater = avater.join("\\") + "\\Assets\\uploads\\" + data.avater;
        if (fs.existsSync(avater) && data.avater != "static\\myImage.jpg")
            fs.rmSync(avater);
        userInfo.updateOne({}, { avater: "static\\myImage.jpg" }, { returnDocument: 'after' }, function(err) {
            if (err) return handleError(err);
            console.log(new Date().toLocaleString(), "Avater Deleted Success")
        });
    });
    res.redirect('/');

}

module.exports = {
    showUserInfo,
    editUserInfo,
    editUserImage,
    deleteUserImage
};