const express = require('express');
const portofolio = require('../../controller/User/profileController');
const router = express.Router();


router.get('', portofolio.showPortofolio);
router.post('/add', portofolio.addOrder);



module.exports = router;