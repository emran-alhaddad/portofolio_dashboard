const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/portofolio")
    .then(() => { console.log("Connected to Database") })
    .catch((err) => { console.log(` Error Occured >>>> ${err}`) });

module.exports = mongoose;