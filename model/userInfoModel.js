const database = require('../DB/connection');
var moment = require('moment'); // require for formatting date 


/**************** User Info Schema ****************/
const userInfo = new database.Schema({
    fullName: {
        type: String,
        required: true,
        min: [20, 'full name at least 20 characters '],
        max: [100, 'full name at most 100 characters ']
    },
    DOB: {
        type: String,
        required: true,
        default: moment().format('dd/mm/yyyy')
    },
    material_Status: {
        type: String,
        required: true,
        default: "single",
    },

    summary: String,
    avater: String
});

module.exports = database.model("userInfos", userInfo);