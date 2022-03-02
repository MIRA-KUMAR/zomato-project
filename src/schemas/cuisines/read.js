const mongoose = require('mongoose');

module.exports = async(req, res, next) => {
    const CuisineModel = mongoose.model('Cuisine');
    const data = await CuisineModel.find({}).limit(2);

    return res.send(data);
}