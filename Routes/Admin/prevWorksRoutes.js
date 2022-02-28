const express = require('express');
const prevWorks = require('../../controller/Admin/prevWorksController');
const router = express.Router();


router.get('', prevWorks.showPrevWorks);

router.post('/add', prevWorks.addNewPrevWork);

router.post('/edit', prevWorks.editPrevWork);

router.post('/undo', prevWorks.restorePrevWork);

router.post('/delete', prevWorks.deletePrevWork);

router.post('/delete_all', prevWorks.deleteAllPrevWorks);



module.exports = router;