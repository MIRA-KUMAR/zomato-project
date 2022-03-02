const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24),
})

module.exports = async(req, res) => {
    const {error, value} = schema.validate(req.params);

    if (error) {
        return res.send(error);
    }

    const CuisineModel = mongoose.model('Cuisine');

    if (await CuisineModel.exists({ _id: mongoose.mongo.ObjectId(value.id)})) {
        await CuisineModel.deleteOne({
            _id: mongoose.mongo.ObjectId(value.id)
        });
        return res.send({success: true});
    }

    return res.send({success: false});
}