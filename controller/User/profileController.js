const userInfo = require('../../model/userInfoModel');
const experiences = require('../../model/experiencesModel');
const skills = require('../../model/skillsModel');
const prevWorks = require('../../model/prevWorksModel');
const services = require('../../model/servicesModel');
const contacts = require('../../model/contactInfoModel');


const getUserInfo = () => {
    userInfo.findOne({}, (userInfoErr, userInfoData) => {
        if (userInfoErr) console.log(userInfoErr);
        return userInfoData;
    })
};

const getExperinces = (req, res) => {
    experiences.find({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getSkills = (req, res) => {
    skills.find({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getPrevWorks = (req, res) => {
    prevWorks.find({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getServices = (req, res) => {
    services.find({}, (err, data) => {
        if (err) console.log(err);
        return data;
    })
};

const getContact = (req, res) => {
    // contacts.findOne({}, (err, data) => {
    //     if (err) console.log(err);
    //     return data;
    // })
};



const showPortofolio = (req, res) => {

    userInfo.findOne({}, (userInfoErr, userInfoData) => {
        if (userInfoErr) console.log(userInfoErr);

        skills.findOne({}, (skillsErr, skillsData) => {
            if (skillsErr) console.log(skillsErr);

            experiences.find({}, (experiencesErr, experiencesData) => {
                if (experiencesErr) console.log(experiencesErr);

                prevWorks.find({}, (prevWorksErr, prevWorksData) => {
                    if (prevWorksErr) console.log(prevWorksErr);

                    services.find({}, (servicesErr, servicesData) => {
                        if (servicesErr) console.log(servicesErr);
                        console.log(__dirname)

                        res.render('./userView/userPortofolio', {
                            userInfo: userInfoData,
                            skills: skillsData,
                            experiences: experiencesData,
                            prevWorks: prevWorksData,
                            services: servicesData,
                            contacts: {}
                        });

                        // contacts.find({}, (contactsErr, contactsData) => {
                        //     if (contactsErr) console.log(contactsErr);

                        //     res.render('portofolio', {
                        //         userInfo: userInfoData,
                        //         skills: skillsData,
                        //         experiences: experiencesData,
                        //         prevWorks: prevWorksData,
                        //         services: servicesData,
                        //         contacts: contactsData
                        //     })
                        // })
                    })
                })
            })

        })


    })


}


module.exports = showPortofolio;