const express = require('express');
const userAuth = require('../controller/loginController');
const router = express.Router();


router.get('', userAuth.showPage);

router.post('/auth/', userAuth.authenticateUser);


module.exports = router;