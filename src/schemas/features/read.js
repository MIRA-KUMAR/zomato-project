const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const FeatureModel = mongoose.model('Feature');
    const data = await FeatureModel.find({}).limit(2);

    return res.send(data);
}