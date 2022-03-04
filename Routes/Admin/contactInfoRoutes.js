const express = require('express');
const contactInfo = require('../../controller/Admin/contactInfoController');
const router = express.Router();


router.get('', contactInfo.showContactInfo);

router.post('/address/add', contactInfo.addNewAddress);
router.post('/email/add', contactInfo.addNewEmail);
router.post('/phone/add', contactInfo.addNewPhone);
router.post('/socialMedia/add', contactInfo.addNewSocialMedia);

router.post('/address/edit', contactInfo.editAddress);
router.post('/email/edit', contactInfo.editEmail);
router.post('/phone/edit', contactInfo.editPhone);
router.post('/socialMedia/edit', contactInfo.editSocialMedia);

router.post('/address/delete', contactInfo.deleteAddress);
router.post('/email/delete', contactInfo.deleteEmail);
router.post('/phone/delete', contactInfo.deletePhone);
router.post('/socialMedia/delete', contactInfo.deleteSocialMedia);
router.post('/allSocialMedia/delete', contactInfo.deleteAllSocialMedia);



module.exports = router;