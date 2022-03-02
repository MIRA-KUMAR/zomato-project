const mongoose = require('mongoose');
const joi = require('joi');


const schema = joi.object({
    name: joi.string().required(),
});

module.exports = async (req, res) => {
    const {error, value} = schema.validate(req.body);

    if (error) {
        res.send(error);
    }
    const DishModel = mongoose.model('Dish');
    const newData = DishModel(value);
    await newData.save();

    return res.send(newData);
}