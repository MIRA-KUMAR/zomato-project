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

    const FeatureModel = mongoose.model('Feature');

    if (await FeatureModel.exists({ _id: mongoose.mongo.ObjectId(value.id)})) {
        await FeatureModel.deleteOne({
            _id: mongoose.mongo.ObjectId(value.id)
        });

        return res.send({success: true});
    }

    return res.send({success: false});
}