const userInfo = require('../../model/userInfoModel');
const contact = require('../../model/contactInfoModel');
var formidable = require('formidable');
const userThem = require('../../model/systemUtils')
const fs = require("fs");

const showContactInfo = async(req, res) => {

    contact.contactInfo.find({})
        .then(data => {
            userInfo.findOne({})
                .then((userData) => {
                    userThem.find({}, (themErr, themData) => {

                        res.render('./dashboardView/contact', {
                            userInfo: userData,
                            contactInfo: data[0],
                            adminThem: themData[0].adminThem
                        });
                    });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

}

const updateContactData = newData => {
    contact.contactInfo.updateOne({}, {
            addresses: newData.addresses,
            emails: newData.emails,
            phones: newData.phones,
            socialMedia: newData.socialMedia
        }, { returnDocument: 'after' },
        function(err) {
            if (err) return handleError(err);
            console.log(new Date().toLocaleString(), "Contact Updated Success")
        });
}

// Add New 

const addNewAddress = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    newData.addresses.push(fields);
                    updateContactData(newData);
                    console.log("Added New Address");
                }));
        }

    });
}

const addNewEmail = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    newData.emails.push(fields);
                    updateContactData(newData);
                }));

        }

    });
}

const addNewPhone = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    newData.phones.push(fields);
                    updateContactData(newData);
                }));

        }

    });
}

const addNewSocialMedia = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    newData.socialMedia.push(fields);
                    updateContactData(newData);
                }));
        }

    });
}


// Edit 

const editAddress = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    for (const key in newData.addresses) {
                        if (Object.hasOwnProperty.call(newData.addresses, key)) {
                            const element = newData.addresses[key];
                            if (element._id == fields._id) {
                                newData.addresses[key].title = fields.title;
                                newData.addresses[key].state = fields.state;
                            }

                        }
                    }
                    updateContactData(newData);
                }));
        }

    });
}

const editEmail = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    for (const key in newData.emails) {
                        if (Object.hasOwnProperty.call(newData.emails, key)) {
                            const element = newData.emails[key];
                            if (element._id == fields._id) {
                                newData.emails[key].title = fields.title;
                                newData.emails[key].state = fields.state;
                            }

                        }
                    }
                    updateContactData(newData);
                }));

        }

    });
}

const editPhone = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    for (const key in newData.phones) {
                        if (Object.hasOwnProperty.call(newData.phones, key)) {
                            const element = newData.phones[key];
                            if (element._id == fields._id) {
                                newData.phones[key].title = fields.title;
                                newData.phones[key].state = fields.state;
                            }

                        }
                    }
                    updateContactData(newData);
                }));

        }

    });
}

const editSocialMedia = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            contact.contactInfo.findOne({})
                .then((data => {
                    var newData = data;
                    for (const key in newData.socialMedia) {
                        if (Object.hasOwnProperty.call(newData.socialMedia, key)) {
                            const element = newData.socialMedia[key];
                            if (element._id == fields._id) {
                                newData.socialMedia[key].url = fields.url;
                                newData.socialMedia[key].icon = fields.icon;
                                newData.socialMedia[key].state = fields.state;
                            }

                        }
                    }
                    updateContactData(newData);
                }));
        }

    });
}


// Delete 

const deleteAddress = (req, res) => {
    if (req.body) {
        contact.contactInfo.findOne({})
            .then((data => {
                var newData = data;

                for (let index = 0; index < data.addresses.length; index++) {
                    console.log(newData.addresses.pop());

                }

                for (const key in data.addresses) {
                    if (Object.hasOwnProperty.call(data.addresses, key)) {
                        const element = data.addresses[key];
                        if (element._id != req.body._id) {
                            newData.addresses.push(element)
                        }

                    }
                }

                updateContactData(newData);
            }));
    }


}

const deleteEmail = (req, res) => {
    if (req.body) {
        contact.contactInfo.findOne({})
            .then((data => {
                var newData = data;
                newData.emails.forEach(element => {
                    data.emails.pop();
                });
                for (const key in newData.emails) {
                    if (Object.hasOwnProperty.call(newData.emails, key)) {
                        const element = newData.emails[key];
                        if (element._id != req.body._id) {
                            data.emails.push(element)
                        }
                    }
                }
                newData.emails = data.emails;
                updateContactData(newData);
            }));
    }


}

const deletePhone = (req, res) => {
    if (req.body) {
        contact.contactInfo.findOne({})
            .then((data => {
                var newData = data;
                newData.phones.forEach(element => {
                    data.phones.pop();
                });
                for (const key in newData.phones) {
                    if (Object.hasOwnProperty.call(newData.phones, key)) {
                        const element = newData.phones[key];
                        if (element._id != req.body._id) {
                            data.phones.push(element)
                        }
                    }
                }
                newData.phones = data.phones;
                updateContactData(newData);
            }));
    }


}

const deleteSocialMedia = (req, res) => {
    if (req.body) {
        contact.contactInfo.findOne({})
            .then((data => {
                var newData = data;
                data.socialMedia.forEach(element => {
                    newData.socialMedia.pop();
                });
                for (const key in data.socialMedia) {
                    if (Object.hasOwnProperty.call(data.socialMedia, key)) {
                        const element = data.socialMedia[key];
                        if (element._id != req.body._id) {
                            newData.socialMedia.push(element)
                        } else
                            newData.socialMedia.pop();
                    }
                }
                updateContactData(newData);
            }));

    }


}

const deleteAllSocialMedia = (req, res) => {
    if (req.body) {
        contact.contactInfo.findOne({})
            .then((data => {
                var newData = data;
                newData.socialMedia = [];
                updateContactData(newData);
            }));

    }


}


module.exports = {
    showContactInfo,
    addNewAddress,
    addNewEmail,
    addNewPhone,
    addNewSocialMedia,
    editAddress,
    editEmail,
    editPhone,
    editSocialMedia,
    deleteAddress,
    deleteEmail,
    deletePhone,
    deleteSocialMedia,
    deleteAllSocialMedia
};