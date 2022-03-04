const experiences = require('../../model/experiencesModel');
const userInfo = require('../../model/userInfoModel');
var formidable = require('formidable');
const userThem = require('../../model/systemUtils')

const showExperiences = (req, res) => {

    experiences.find({ state: 1 })
        .then(data => {
            userInfo.findOne({})
                .then((userData) => {
                    experiences.find({ state: 0 })
                        .then((trashData) => {
                            userThem.find({}, (themErr, themData) => {

                                res.render('./dashboardView/experiences', {
                                    userInfo: userData,
                                    experiences: data,
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

const addNewExperience = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            experiences.create(fields);
            res.redirect('/dashboard/experiences');
        }

    });
}

const editExperience = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            experiences.findByIdAndUpdate(fields._id, fields, { returnDocument: 'after' }, () => {});
            res.redirect('/dashboard/experiences');
        }

    });
}

const deleteExperience = (req, res) => {

    if (req.body) {
        experiences.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});
        res.redirect('/dashboard/experiences');
    }
}

const deleteAllExperiences = (req, res) => {


    experiences.updateMany({}, { state: 0 }, { returnDocument: 'after' }, () => {});
    res.redirect('/dashboard/experiences');

}

const restoreExperience = (req, res) => {

    if (req.body) {
        experiences.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});
        res.redirect('/dashboard/experiences');
    }
}


module.exports = {
    showExperiences,
    addNewExperience,
    editExperience,
    deleteExperience,
    deleteAllExperiences,
    restoreExperience
};