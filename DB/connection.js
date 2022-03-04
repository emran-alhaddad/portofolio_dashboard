require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB)
    .then(() => { console.log("Connected to Database") })
    .catch((err) => { console.log(` Error Occured >>>> ${err}`) });

module.exports = mongoose;