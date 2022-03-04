const express = require('express');
const orders = require('../../controller/Admin/ordersController');
const router = express.Router();


router.get('', orders.showOrders);

router.post('/undo', orders.restoreOrder);

router.post('/delete', orders.deleteOrder);

router.post('/delete_all', orders.deleteAllOrders);


module.exports = router;