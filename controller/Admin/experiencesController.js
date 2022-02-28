const experiences = require('../../model/experiencesModel');
const userInfo = require('../../model/userInfoModel');
var formidable = require('formidable');
var userData = null;
var trashData = null;

const getUserInfo = (req, res) => {
    userInfo.findOne({}, (err, data) => {
        if (err) console.log(err);
        userData = data;
    })
};

const getTrashedExperiences = (req, res) => {
    experiences.find({ state: 0 }, (err, data) => {
        if (err) console.log(err);
        trashData = data;
    })
}

const showExperiences = async(req, res) => {
    await getUserInfo(req, res);
    getTrashedExperiences(req, res);
    experiences.find({ state: 1 }, (err, data) => {
        if (err) console.log(err);
        res.render('./dashboardView/experiences', { userInfo: userData, experiences: data, Trash: trashData });
    })
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
            experiences.deleteOne({ id: fields._id }, { returnDocument: 'after' }, () => {});
            experiences.create(fields);
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