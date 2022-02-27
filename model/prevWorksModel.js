const database = require('../DB/connection');


/**************** Previous Works Schema ****************/
const prevWorks = new database.Schema({
    title: {
        type: String,
        required: true,
        min: [5, 'illegal Previous Work title ! its length must be >= 5 '],
        max: [30, 'illegal Previous Work title ! its length must be <= 30 ']
    },
    image: {
        type: String,
        required: true,
    },

    description: {
        type: String
    },

    liveDemo: {
        type: String
    },
    state: String,

});

module.exports = database.model("prevWorks", prevWorks);