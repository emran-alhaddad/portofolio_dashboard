const express = require('express');
const experiences = require('../controller/experiencesController');
const router = express.Router();

router.get('', experiences.showExperiences);

router.post('/add', experiences.addNewExperience);

router.post('/edit', experiences.editExperience);

router.post('/undo', experiences.restoreExperience);

router.post('/delete', experiences.deleteExperience);

router.post('/delete_all', experiences.deleteAllExperiences);


module.exports = router;