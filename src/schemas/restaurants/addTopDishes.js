const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24).required(),
})

module.exports = async (req, res) => {
    const RestaurantModel = mongoose.model('Restaurant');
    const DishModel = mongoose.model('Dish');

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.send(error);
    }

    if (
        await RestaurantModel.exists({ _id: mongoose.mongo.ObjectId(params.id) })
        && await DishModel.exists({ _id: mongoose.mongo.ObjectId(value.id)})
    ) {
        const update = await RestaurantModel.findOneAndUpdate({
            _id: mongoose.mongo.ObjectId(params.id)
        }, {
            $push: {
                topDishes: mongoose.mongo.ObjectId(value.id)
            }
        }, {
            upsert: false,
            new: true
        });

        return res.status(200).send({
            success: true,
            value: update
        })
    }

    return res.status(404).send({
        success: false,
        error: 'Restaurant or Dish not found'
    });
}