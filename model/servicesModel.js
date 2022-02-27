const database = require('../DB/connection');

/**************** Services Schema ****************/
const services = new database.Schema({
    title: {
        type: String,
        required: true,
        min: [5, 'illegal service title ! its length must be >= 5 '],
        max: [30, 'illegal service title ! its length must be <= 30 ']
    },
    image: {
        type: String,
        required: true,
    },

    description: {
        type: String
    },
    state: String,
});


module.exports = database.model("services", services);