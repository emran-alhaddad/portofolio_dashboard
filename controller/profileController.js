const userInfo = require('../model/userInfoModel');
const experiences = require('../model/experiencesModel');
const skills = require('../model/skillsModel');
const prevWorks = require('../model/prevWorksModel');
const services = require('../model/servicesModel');
const contacts = require('../model/contactInfoModel');



const getUserInfo = (req, res) => {
    userInfo.findOne({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getExperinces = (req, res) => {
    experiences.findOne({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getSkills = (req, res) => {
    skills.findOne({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getPrevWorks = (req, res) => {
    prevWorks.findOne({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getServices = (req, res) => {
    services.findOne({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getContact = (req, res) => {
    contacts.findOne({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};



const showPortofolio = async(req, res) => {

    res.render('portofolio', {
        userInfo: getUserInfo(req, res),
        skills: getSkills(req, res),
        experiences: getExperinces(req, res),
        prevWorks: getPrevWorks(req, res),
        services: getServices(req, res),
        contacts: getContact(req, res)
    })
}