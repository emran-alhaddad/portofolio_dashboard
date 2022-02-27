const express = require('express');
const orders = require('../controller/ordersController');
const router = express.Router();


router.get('', orders.showOrders);

router.post(':id', (req, res) => {

});

router.put(':id', (req, res) => {

});

router.delete(':id', (req, res) => {

});

module.exports = router;