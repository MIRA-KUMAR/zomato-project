const mongoose = require('mongoose');
const joi = require('joi');


const schema = joi.object({
    name: joi.string().required(),
});

module.exports = async (req, res) => {
    const {error, value} = schema.validate(req.body);

    if (error) {
        return res.send(error);
    }
    const FeatureModel = mongoose.model('Feature');
    const newData = new FeatureModel(value);
    await newData.save();

    return res.send(newData);
}