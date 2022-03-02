const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const DishModel = mongoose.model('Dish');
    const data = await RestaurantModel.find({}).limit(2);

    return res.send(data);
}