const userInfo = require('../model/userInfoModel');
const skills = require('../model/skillsModel');
var formidable = require('formidable');
const fs = require("fs");
var userData = null;
var trashData = null;

const getUserInfo = (req, res) => {
    userInfo.findOne({}, (err, data) => {
        if (err) console.log(err);
        userData = data;
    })
};

const getTrashedSkills = (req, res) => {
    skills.find({ state: 0 }, (err, data) => {
        if (err) console.log(err);
        trashData = data;
    })
}

const showSkills = async(req, res) => {

    skills.find({ state: 1 }, async(err, data) => {
        if (err) console.log(err);
        await getUserInfo(req, res);
        await getTrashedSkills(req, res);
        res.render('skills', { userInfo: userData, skills: data, Trash: trashData });
    })
}

const addNewSkill = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            skills.create(fields);
            res.redirect('/skills');
        }

    });
}

const editSkill = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            skills.deleteOne({ id: fields._id }, { returnDocument: 'after' }, () => {});
            skills.create(fields);
            res.redirect('/skills');
        }

    });
}

const deleteSkill = (req, res) => {

    if (req.body) {
        skills.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});
        res.redirect('/skills');
    }
}

const deleteAllSkills = (req, res) => {
    skills.updateMany({ state: 1 }, { state: 0 }, { returnDocument: 'after' }, () => {});
    res.redirect('/skills');

}

const restoreSkill = (req, res) => {

    if (req.body) {
        skills.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});
        res.redirect('/skills');
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