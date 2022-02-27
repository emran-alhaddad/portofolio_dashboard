const database = require('../DB/connection');

/**************** Experiences Schema ****************/
const experiences = new database.Schema({
    title: {
        type: String,
        required: true,
        min: [3, 'illegal experience title ! its length must be >= 3 '],
        max: [50, 'illegal experience title ! its length must be <= 50 ']
    },
    precentage: {
        type: Number,
        required: true,
        min: [1, 'experience precentage must be >=1% and <=100% '],
        max: [100, 'experience precentage must be >=1% and <=100% ']
    },
    state: Number,
});

module.exports = database.model("experiences", experiences);