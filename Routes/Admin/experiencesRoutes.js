const express = require('express');
const experiences = require('../../controller/Admin/experiencesController');
const router = express.Router();

router.get('', experiences.showExperiences);

router.post('/add', experiences.addNewExperience);

router.post('/edit', experiences.editExperience);

router.post('/undo', experiences.restoreExperience);

router.post('/delete', experiences.deleteExperience);

router.post('/delete_all', experiences.deleteAllExperiences);


module.exports = router;

var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Welcome to this page!');
    res.end();
}).listen(3000);