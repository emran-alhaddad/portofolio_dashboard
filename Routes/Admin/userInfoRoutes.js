const express = require('express');
const { isLogedIn } = require('../../controller/Admin/loginController');
const userInfo = require('../../controller/Admin/userInfoController');
const router = express.Router();

router.get('', userInfo.showUserInfo);

router.post('', userInfo.editUserInfo);

router.post('/avater/edit', userInfo.editUserImage);

router.post('/avater/delete', userInfo.deleteUserImage);



module.exports = router;