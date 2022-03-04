const database = require('../DB/connection');

/**************** Contact Info Schema ****************/

const contactInfo = new database.Schema({
    addresses: { type: [{ title: String, state: { type: Number, default: 1 } }] },
    phones: { type: [{ title: String, state: { type: Number, default: 1 } }] },
    emails: { type: [{ title: String, state: { type: Number, default: 1 } }] },
    socialMedia: { type: [{ url: String, icon: String, state: { type: Number, default: 1 } }] },
});

module.exports = {
    contactInfo: database.model("contactInfo", contactInfo),
}