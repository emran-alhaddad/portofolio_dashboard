const database = require('../DB/connection');

/**************** Skills Schema ****************/
const skills = new database.Schema({
    title: {
        type: String,
        required: true,
        min: [5, 'illegal skill title ! its length must be >= 5 '],
        max: [100, 'illegal skill title ! its length must be <= 100 ']
    },
    precentage: {
        type: Number,
        required: true,
        min: [1, 'skill precentage must be >=1% and <=100% '],
        max: [100, 'skill precentage must be >=1% and <=100% ']
    },
    state: Number,
});

module.exports = database.model("skills", skills);