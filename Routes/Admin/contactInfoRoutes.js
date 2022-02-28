const express = require('express');
const contactInfo = require('../../controller/Admin/contactInfoController');
const router = express.Router();


router.get('', contactInfo.showContactInfo);

router.post(':id', (req, res) => {

});

router.put(':id', (req, res) => {

});

router.delete(':id', (req, res) => {

});

module.exports = router;