const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const RestaurantModel = mongoose.model('Restaurant');
    const data = await RestaurantModel.findById(req.params.id);

    return res.send(data);
}