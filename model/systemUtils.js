const database = require('../DB/connection');


/**************** System Utils Schema ****************/
const systemUtils = new database.Schema({
    userThem: {
        type: String,
        default: 'Dark'
    },
    adminThem: {
        type: String,
        default: 'Dark'
    }

});

module.exports = database.model("systemUtils", systemUtils);