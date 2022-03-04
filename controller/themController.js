const them = require('../model/systemUtils');


const userLightThem = (req, res) => {
    console.log("ChangeLightThem");
    them.findOneAndUpdate({ userThem: 'Dark' }, { userThem: 'Light' }, { returnDocument: 'after' }, () => {});
    res.redirect('/');
}

const userDarkThem = (req, res) => {
    them.findOneAndUpdate({ userThem: 'Light' }, { userThem: 'Dark' }, { returnDocument: 'after' }, () => {});
    res.redirect('/');
}

const adminLightThem = (req, res) => {
    them.findOneAndUpdate({ adminThem: 'Dark' }, { adminThem: 'Light' }, { returnDocument: 'after' }, () => {});
    res.redirect('/dashboard/');
}

const adminDarkThem = (req, res) => {
    them.findOneAndUpdate({ adminThem: 'Light' }, { adminThem: 'Dark' }, { returnDocument: 'after' }, () => {});
    res.redirect('/dashboard/');
}


module.exports = {
    changeUserThemToLight: userLightThem,
    changeUserThemToDark: userDarkThem,
    changeAdminThemToLight: adminLightThem,
    changeAdminThemToDark: adminDarkThem,
}