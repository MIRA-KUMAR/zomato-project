const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24),
});

module.exports = async (req, res) => {
    const {error, value} = schema.validate(req.params);

    if (error) {
        res.send(error);
    }

    const DishModel = mongoose.model('Dish');

    if (await DishModel.exists({ _id: mongoose.mongo.ObjectId(value.id)})) {
        await DishModel.deleteOne({
            _id: mongoose.mongo.ObjectId(value.id)
        });

        return res.send({success: true});
    }

    return res.send({success: false});
}