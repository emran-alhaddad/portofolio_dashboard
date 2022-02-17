const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
server.set('view engine', 'ejs');
server.use(express.static('Assets'));
server.set('views', 'pages');
const fs = require("fs");
let skills = null;
let experiences = null;
let prev_works = null;
let services = null;




server.listen(PORT, console.log(`Server started on port ${PORT}`));


server.get('/', (req, res) => {
    readJSON(req, res);
})


async function readJSON(req, res) {
    await fs.readFile("Assets/json/skills.json", function(err, data) {
        if (err) throw err;
        skills = JSON.parse(data);
    });

    await fs.readFile("Assets/json/experiences.json", function(err, data) {
        if (err) throw err;
        experiences = JSON.parse(data);
    });

    await fs.readFile("Assets/json/prev-work.json", function(err, data) {
        if (err) throw err;
        prev_works = JSON.parse(data);
    });

    await fs.readFile("Assets/json/services.json", function(err, data) {
        if (err) throw err;
        services = JSON.parse(data);
    });

    res.render('home', { skills: skills, experiences: experiences, prev_works: prev_works, services: services });
}