const mongoose = require('mongoose');
const joi = require('joi');


const schema = joi.object({
    id: joi.string().hex().length(24),
});

const bodySchema = joi.object({
    name: joi.string(),
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

    const DishModel = mongoose.model('Dish');

    if (await DishModel.exists({ _id: mongoose.mongo.ObjectId(params.value.id)})) {
        const update = await DishModel.findOneAndUpdate({
            _id: mongoose.mongo.ObjectId(params.value.id)
        }, {
            $set: body.value

        }, {
            new: true
        });

        return res.send({success: true, value: update});
    }

    return res.send({success: false});

}
