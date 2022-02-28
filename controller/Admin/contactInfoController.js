const userInfo = require('../../model/userInfoModel');
const contactInfo = require('../../model/contactInfoModel');
var userData = null;
const getUserInfo = (req, res) => {
    userInfo.findOne({}, (err, data) => {
        if (err) console.log(err);
        userData = data;
    })
};


const showContactInfo = async(req, res) => {
    await getUserInfo(req, res);
    res.render('contact', { userInfo: userData });

}

module.exports = {
    showContactInfo
};