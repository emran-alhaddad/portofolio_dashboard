const express = require('express');
const showPortofolio = require('../../controller/User/profileController');
const router = express.Router();


router.get('', showPortofolio);



module.exports = router;