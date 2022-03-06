const express = require('express');
const settings = require('../../controller/Admin/settingsController');
const router = express.Router();

router.get('', settings.showSettings);
router.post('', settings.editSettings);

module.exports = router;