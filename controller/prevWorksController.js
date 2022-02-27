const userInfo = require('../model/userInfoModel');
const prevWorks = require('../model/prevWorksModel');
var formidable = require('formidable');
const getFileInfo = require('../getFile');
const fs = require('fs');
var userData = null;
var trashData = null;

const getUserInfo = (req, res) => {
    userInfo.findOne({}, (err, data) => {
        if (err) console.log(err);
        userData = data;
    })
};

const getTrashedPrevWorks = (req, res) => {
    prevWorks.find({ state: 0 }, (err, data) => {
        if (err) console.log(err);
        trashData = data;
    })
}

const showPrevWorks = async(req, res) => {

    prevWorks.find({ state: 1 }, async(err, data) => {
        if (err) console.log(err);
        await getUserInfo(req, res);
        await getTrashedPrevWorks(req, res);
        res.render('prevWorks', { userInfo: userData, prevWorks: data, Trash: trashData });
    })
}

const addNewPrevWork = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (files) {
            var image = getFileInfo(files.image, '\\Assets\\uploads\\prevWorks\\');
            if (image.extention === "jpg") {
                fs.rename(image.oldPath, image.newPath, () => {});

                if (fields) {
                    prevWorks.create({
                        title: fields.title,
                        image: image.name,
                        description: fields.description,
                        liveDemo: fields.liveDemo,
                        state: fields.state
                    });
                    res.redirect('/prevWorks');
                } else
                    res.redirect('/');
            } else
                res.write(`
                <script>
                    alert("Skill Image Must be JPG"); 
                    window.location.pathname = "/skills";
                </script>`);

        }
    });
}

const editPrevWork = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var image = null;

        if (files.image.mimetype != "application/octet-stream") {

            image = getFileInfo(files.image, '\\Assets\\uploads\\prevWorks\\');

            if (image.extention === "jpg") {
                fs.rename(image.oldPath, image.newPath, () => {});
            } else if (image.extention === "") {

            } else {
                res.write(`<script>
                            alert("PrevWork Image Must be JPG"); 
                            window.location.pathname = "/prevWorks";
                        </script>`);
                return
            }

            prevWorks.findById(fields._id, (er, data) => {
                var oldImage = __dirname.split("\\");
                oldImage.pop();
                oldImage = oldImage.join("\\") + "\\Assets\\uploads\\prevWorks\\" + data.image;
                if (fs.existsSync(oldImage))
                    fs.rmSync(oldImage);
            })
        }

        if (fields) {
            if (image) {
                prevWorks.findByIdAndUpdate(fields._id, {
                    title: fields.title,
                    image: image.name,
                    description: fields.description,
                    liveDemo: fields.liveDemo,
                    state: fields.state
                }, { returnDocument: 'after' }, () => {});
            } else {
                prevWorks.findByIdAndUpdate(fields._id, {
                    title: fields.title,
                    description: fields.description,
                    state: fields.state
                }, { returnDocument: 'after' }, () => {});
            }
        }
        res.redirect('/prevWorks');
    });
}

const deletePrevWork = (req, res) => {

    if (req.body) {
        prevWorks.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});
        res.redirect('/prevWorks');
    }
}

const deleteAllPrevWorks = (req, res) => {
    prevWorks.updateMany({ state: 1 }, { state: 0 }, { returnDocument: 'after' }, () => {});
    res.redirect('/prevWorks');

}

const restorePrevWork = (req, res) => {

    if (req.body) {
        prevWorks.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});
        res.redirect('/prevWorks');
    }
}


module.exports = {
    showPrevWorks,
    addNewPrevWork,
    editPrevWork,
    deletePrevWork,
    deleteAllPrevWorks,
    restorePrevWork
};