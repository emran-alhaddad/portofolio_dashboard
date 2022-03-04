const userInfo = require('../../model/userInfoModel');
const experiences = require('../../model/experiencesModel');
const skills = require('../../model/skillsModel');
const prevWorks = require('../../model/prevWorksModel');
const services = require('../../model/servicesModel');
const contacts = require('../../model/contactInfoModel');
const orders = require('../../model/ordersModel');
var formidable = require('formidable');
const userThem = require('../../model/systemUtils');


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

                        contacts.contactInfo.find({}, (contactsErr, contactsData) => {
                            if (contactsErr) console.log(contactsErr);
                            userThem.find({}, (themErr, themData) => {

                                res.render('./userView/userPortofolio', {
                                    userInfo: userInfoData,
                                    skills: skillsData,
                                    experiences: experiencesData,
                                    prevWorks: prevWorksData,
                                    services: servicesData,
                                    contactInfo: contactsData[0],
                                    userThem: themData[0].userThem
                                })

                            });

                        })
                    })
                })
            })

        })


    })


}

const addOrder = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            orders.create(fields);
        } else {
            res.send(`
                        <script>
                            alert('Invalid Order Request !!!! \n Try again later please');
                            window.location.href = '/';
                        </script>
                    `);
        }
    });

}


module.exports = {
    showPortofolio,
    addOrder
};