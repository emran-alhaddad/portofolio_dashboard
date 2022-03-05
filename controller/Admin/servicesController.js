const userInfo = require('../../model/userInfoModel');
const services = require('../../model/servicesModel');
var formidable = require('formidable');
const getFileInfo = require('../../getFile');
const userThem = require('../../model/systemUtils')
const fs = require('fs');

const showServices = (req, res) => {

    services.find({ state: 1 })
        .then(data => {
            userInfo.findOne({})
                .then((userData) => {
                    services.find({ state: 0 })
                        .then((trashData) => {
                            userThem.find({}, (themErr, themData) => {

                                res.render('./dashboardView/services', {
                                    userInfo: userData,
                                    services: data,
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

const addNewService = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (files) {
            var image = getFileInfo(files.image, '\\Assets\\uploads\\services\\');
            if (image.extention === "jpg" || image.extention.toLowerCase() === 'png') {
                fs.rename(image.oldPath, image.newPath, () => {});

                if (fields) {
                    services.create({
                        title: fields.title,
                        image: image.name,
                        description: fields.description,
                        state: fields.state
                    });
                } else
                    res.redirect('/dashboard/');
            } else
                res.write(`
                <script>
                    alert("Skill Image Must be JPG"); 
                    window.location.pathname = "/dashboard/services";
                </script>`);

        }
    });
}

const editService = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var image = null;

        if (files.image.mimetype != "application/octet-stream") {

            image = getFileInfo(files.image, '\\Assets\\uploads\\services\\');

            if (image.extention.toLowerCase() === "jpg" || image.extention.toLowerCase() === "png") {
                fs.rename(image.oldPath, image.newPath, () => {});
            } else if (image.extention === "") {

            } else {
                res.write(`<script>
                            alert("Service Image Must be JPG"); 
                            window.location.pathname = "/dashboard/services";
                        </script>`);
                return
            }

            services.findById(fields._id, (er, data) => {
                var oldImage = __dirname.split("\\");
                oldImage.pop();
                oldImage = oldImage.join("\\") + "\\Assets\\uploads\\services\\" + data.image;
                if (fs.existsSync(oldImage))
                    fs.rmSync(oldImage);
            })
        }

        if (fields) {
            if (image) {
                services.findByIdAndUpdate(fields._id, {
                    title: fields.title,
                    image: image.name,
                    description: fields.description,
                    state: fields.state
                }, { returnDocument: 'after' }, () => {});
            } else {
                services.findByIdAndUpdate(fields._id, {
                    title: fields.title,
                    description: fields.description,
                    state: fields.state
                }, { returnDocument: 'after' }, () => {});
            }
        }

    });
}

const deleteService = (req, res) => {

    if (req.body) {
        services.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});

    }
}

const deleteAllServices = (req, res) => {
    services.updateMany({ state: 1 }, { state: 0 }, { returnDocument: 'after' }, () => {});


}

const restoreService = (req, res) => {

    if (req.body) {
        services.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});

    }
}


module.exports = {
    showServices,
    addNewService,
    editService,
    deleteService,
    deleteAllServices,
    restoreService
};