const database = require('../DB/connection');


/**************** User Authentication Schema ****************/
const userAuth = new database.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    remember: {
        type: String,
        required: true,
        default: 'off'
    },
    verified: {
        type: Boolean,
        default: false
    },

});

module.exports = database.model("userAuth", userAuth);