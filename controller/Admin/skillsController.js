const userInfo = require('../../model/userInfoModel');
const skills = require('../../model/skillsModel');
var formidable = require('formidable');
const fs = require("fs");
const userThem = require('../../model/systemUtils')

const showSkills = async(req, res) => {

    skills.find({ state: 1 })
        .then(data => {
            userInfo.findOne({})
                .then((userData) => {
                    skills.find({ state: 0 })
                        .then((trashData) => {
                            userThem.find({}, (themErr, themData) => {


                                res.render('./dashboardView/skills', {
                                    userInfo: userData,
                                    skills: data,
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

const addNewSkill = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            skills.create(fields);
        }

    });
}

const editSkill = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            skills.findByIdAndUpdate(fields._id, fields, { returnDocument: 'after' }, () => {});

        }

    });
}

const deleteSkill = (req, res) => {

    if (req.body) {
        skills.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});

    }
}

const deleteAllSkills = (req, res) => {
    skills.updateMany({ state: 1 }, { state: 0 }, { returnDocument: 'after' }, () => {});


}

const restoreSkill = (req, res) => {

    if (req.body) {
        skills.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});

    }
}


module.exports = {
    showSkills,
    addNewSkill,
    editSkill,
    deleteSkill,
    deleteAllSkills,
    restoreSkill
};