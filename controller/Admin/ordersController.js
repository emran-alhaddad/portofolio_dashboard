const orders = require('../../model/ordersModel');

const showOrders = (req, res) => {
    res.render('orders');
}

module.exports = {
    showOrders
};