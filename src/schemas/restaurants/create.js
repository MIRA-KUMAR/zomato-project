const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    name: joi.string().required(),
    price: joi.number().optional(),
});

module.exports = async (req, res) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.send(error);
    }

    const RestaurantModel = mongoose.model('Restaurant');
    const newData = new RestaurantModel(value);
    await newData.save();

    return res.send(newData);
}