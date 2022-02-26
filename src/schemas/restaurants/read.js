const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const RestaurantModel = mongoose.model('Restaurant');
    const data = await RestaurantModel.find({}).limit(2);

    return res.send(data);
}