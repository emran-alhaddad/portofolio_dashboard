const express = require('express');
const skills = require('../../controller/Admin/skillsController');
const router = express.Router();


router.get('', skills.showSkills);

router.post('/add', skills.addNewSkill);

router.post('/edit', skills.editSkill);

router.post('/undo', skills.restoreSkill);

router.post('/delete', skills.deleteSkill);

router.post('/delete_all', skills.deleteAllSkills);



module.exports = router;