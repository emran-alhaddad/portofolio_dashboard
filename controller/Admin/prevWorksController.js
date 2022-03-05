const userInfo = require('../../model/userInfoModel');
const prevWorks = require('../../model/prevWorksModel');
var formidable = require('formidable');
const getFileInfo = require('../../getFile');
const userThem = require('../../model/systemUtils')
const fs = require('fs');


const showPrevWorks = (req, res) => {

    prevWorks.find({ state: 1 })
        .then(data => {
            userInfo.findOne({})
                .then((userData) => {
                    prevWorks.find({ state: 0 })
                        .then((trashData) => {
                            userThem.find({}, (themErr, themData) => {

                                res.render('./dashboardView/prevWorks', {
                                    userInfo: userData,
                                    prevWorks: data,
                                    Trash: trashData,
                                    adminThem: themData[0].adminThem
                                });
                            });
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}

const addNewPrevWork = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (files) {
            var image = getFileInfo(files.image, '\\Assets\\uploads\\prevWorks\\');
            if (image.extention.toLowerCase() === "jpg" || image.extention.toLowerCase() === "png") {
                fs.rename(image.oldPath, image.newPath, () => {});

                if (fields) {
                    prevWorks.create({
                        title: fields.title,
                        image: image.name,
                        description: fields.description,
                        liveDemo: fields.liveDemo,
                        state: fields.state
                    });

                } else
                    res.redirect('/dashboard/');
            } else
                res.write(`
                <script>
                    alert("Skill Image Must be JPG or PNG"); 
                    window.location.pathname = "/dashboard/prevWorks";
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

            if (image.extention.toLowerCase() === "jpg" || image.extention.toLowerCase() === "png") {
                fs.rename(image.oldPath, image.newPath, () => {});
            } else if (image.extention === "") {

            } else {
                res.write(`<script>
                            alert("PrevWork Image Must be JPG"); 
                            window.location.pathname = "/dashboard/prevWorks";
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

    });
}

const deletePrevWork = (req, res) => {

    if (req.body) {
        prevWorks.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});

    }
}

const deleteAllPrevWorks = (req, res) => {
    prevWorks.updateMany({ state: 1 }, { state: 0 }, { returnDocument: 'after' }, () => {});


}

const restorePrevWork = (req, res) => {

    if (req.body) {
        prevWorks.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});

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