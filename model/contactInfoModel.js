const database = require('../DB/connection');

/**************** Contact Info Schema ****************/
//----Address Schema 
const Address = new database.Schema({ title: String, icon: String });

//----Phone Schema 
const Phone = new database.Schema({ title: String, icon: String });

//----Email Schema 
const Email = new database.Schema({ title: String, icon: String });

//----Social Media Schema 
const SocialMedia = new database.Schema({ url: String, icon: String });

const contactInfo = new database.Schema({
    addresses: { type: [Address], required: true },
    phones: { type: [Phone], required: true },
    emails: { type: [Email], required: true },
    socialMedia: { type: [SocialMedia], required: true },
});

module.exports = {
    contactInfo: database.model("contactInfo", contactInfo),
    address: Address,
    phone: Phone,
    email: Email,
    socialMedia: SocialMedia,

}