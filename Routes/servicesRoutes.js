const express = require('express');
const services = require('../controller/servicesController');
const router = express.Router();


router.get('', services.showServices);

router.post('/add', services.addNewService);

router.post('/edit', services.editService);

router.post('/undo', services.restoreService);

router.post('/delete', services.deleteService);

router.post('/delete_all', services.deleteAllServices);



module.exports = router;