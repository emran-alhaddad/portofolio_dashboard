const express = require('express');
const { isLogedIn } = require('../controller/loginController');
const userInfo = require('../controller/userInfoController');
const router = express.Router();

router.get('', userInfo.showUserInfo);

router.post('', userInfo.editUserInfo);

router.post('/avater/edit', userInfo.editUserImage);

router.post('/avater/delete', userInfo.deleteUserImage);

router.put(':id', (req, res) => {

});

router.delete(':id', (req, res) => {

});

module.exports = router;