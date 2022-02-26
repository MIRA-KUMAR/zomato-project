const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24),
});

module.exports = async (req, res) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
        return res.send(error);
    }

    const RestaurantModel = mongoose.model('Restaurant');

    if (await RestaurantModel.exists({ _id: mongoose.mongo.ObjectId(value.id) })) {
        await RestaurantModel.deleteOne({
            _id: mongoose.mongo.ObjectId(value.id)
        });
    
        return res.send({ success: true });
    }

    return res.send({ success: false });
}
