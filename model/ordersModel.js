const database = require('../DB/connection');

/**************** User Orders Schema ****************/
const orders = new database.Schema({
    applicantName: {
        type: String,
        required: true,
        min: [5, 'Your name length must be >= 5 letters'],
        max: [50, 'Your name length must be <= 50 letters'],
    },
    applicantEmail: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        default: "No Service"
    },
    subject: {
        type: String,
        required: true,
    },
});

module.exports = database.model("orders", orders);