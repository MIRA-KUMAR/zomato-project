const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24),
});

const bodySchema = joi.object({
    name: joi.string(),
    address: joi.string(),
    location: joi.string(),
    cuisine: joi.array().items(joi.string().hex().length(24)),
    topDishes: joi.array().items(joi.string().hex().length(24)),
    price: joi.number(),
    diningRating: joi.number(),
    diningRatingCount: joi.number(),
    deliveryRating: joi.number(),
    deliveryRatingCount: joi.number(),
    features: joi.array().items(joi.string().hex().length(24)),
});

module.exports = async (req, res) => {
    const params = schema.validate(req.params);
    const body = bodySchema.validate(req.body);

    if (params.error) {
        return res.send(params.error);
    }

    if (body.error) {
        return res.send(body.error);
    }

    const RestaurantModel = mongoose.model('Restaurant');

    if (await RestaurantModel.exists({ _id: mongoose.mongo.ObjectId(params.value.id) })) {
        
        const update = await RestaurantModel.findOneAndUpdate({
            _id: mongoose.mongo.ObjectId(params.value.id)
        }, {
            $set: body.value
        }, { new: true });
    
        return res.send({ success: true, value: update });
    }

    return res.send({ success: false });
}
