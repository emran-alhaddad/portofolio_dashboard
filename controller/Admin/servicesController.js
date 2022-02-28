const userInfo = require('../../model/userInfoModel');
const services = require('../../model/servicesModel');
var formidable = require('formidable');
const getFileInfo = require('../../getFile');
const fs = require('fs');
var userData = null;
var trashData = null;

const getUserInfo = (req, res) => {
    userInfo.findOne({}, (err, data) => {
        if (err) console.log(err);
        userData = data;
    })
};

const getTrashedServices = (req, res) => {
    services.find({ state: 0 }, (err, data) => {
        if (err) console.log(err);
        trashData = data;
    })
}

const showServices = async(req, res) => {

    services.find({ state: 1 }, async(err, data) => {
        if (err) console.log(err);
        await getUserInfo(req, res);
        await getTrashedServices(req, res);
        res.render('./dashboardView/services', { userInfo: userData, services: data, Trash: trashData });
    })
}

const addNewService = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (files) {
            var image = getFileInfo(files.image, '\\Assets\\uploads\\services\\');
            if (image.extention === "jpg") {
                fs.rename(image.oldPath, image.newPath, () => {});

                if (fields) {
                    services.create({
                        title: fields.title,
                        image: image.name,
                        description: fields.description,
                        state: fields.state
                    });
                    res.redirect('/dashboard/services');
                } else
                    res.redirect('/');
            } else
                res.write(`
                <script>
                    alert("Skill Image Must be JPG"); 
                    window.location.pathname = "/dashboard/skills";
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

            if (image.extention === "jpg") {
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
        res.redirect('/dashboard/services');
    });
}

const deleteService = (req, res) => {

    if (req.body) {
        services.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});
        res.redirect('/dashboard/services');
    }
}

const deleteAllServices = (req, res) => {
    services.updateMany({ state: 1 }, { state: 0 }, { returnDocument: 'after' }, () => {});
    res.redirect('/dashboard/services');

}

const restoreService = (req, res) => {

    if (req.body) {
        services.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});
        res.redirect('/dashboard/services');
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