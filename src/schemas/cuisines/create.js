const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    name: joi.string().required(),
});

module.exports = async(req, res) => {
    const {error, value} = schema.validate(req.body);

    if (error) {
        return res.send(error);
    }

    const CuisineModel = mongoose.model('Cuisine');
    const newData = new CuisineModel(value);
    await newData.save();

    return res.send(newData);
}