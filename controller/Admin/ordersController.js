const userInfo = require('../../model/userInfoModel');
const orders = require('../../model/ordersModel');
const userThem = require('../../model/systemUtils')
var formidable = require('formidable');



const showOrders = (req, res) => {

    orders.find({ state: 1 })
        .then(data => {
            userInfo.findOne({})
                .then((userData) => {
                    orders.find({ state: 0 })
                        .then((trashData) => {
                            userThem.find({}, (themErr, themData) => {

                                res.render('./dashboardView/orders', {
                                    userInfo: userData,
                                    orders: data,
                                    Trash: trashData,
                                    adminThem: themData[0].adminThem
                                });
                            });
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}


const deleteOrder = (req, res) => {

    if (req.body) {
        orders.findByIdAndUpdate(req.body._id, { state: 0 }, { returnDocument: 'after' }, () => {});
        res.redirect('/dashboard/orders');
    }
}

const deleteAllOrders = (req, res) => {
    orders.updateMany({ state: 1 }, { state: 0 }, { returnDocument: 'after' }, () => {});
    res.redirect('/dashboard/orders');
}

const restoreOrder = (req, res) => {

    if (req.body) {
        orders.findByIdAndUpdate(req.body._id, { state: 1 }, { returnDocument: 'after' }, () => {});
        res.redirect('/dashboard/orders');
    }
}


module.exports = {
    showOrders,
    deleteOrder,
    deleteAllOrders,
    restoreOrder
};