const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    page: joi.number().integer().min(1).default(1),
    limit: joi.number().integer().min(1).default(10),
})

module.exports = async (req, res, next) => {
    try {
        const {error, value} = schema.validate(req.query);

        if (error) {
            return res.send(error);
        }
        
        const RestaurantModel = mongoose.model('Restaurant');

        const { page, limit } = value;
        const restaurant = await RestaurantModel.find().skip((page-1)*limit).limit(limit)
        const count = await RestaurantModel.countDocuments();
        const totalPages = Math.ceil(count / limit)

        return res.status(200).send({
            data: restaurant,
            paging: {
                total: count,
                page: page,
                pages: totalPages,
            },
        });
    } catch (err) {
        return res.send(500).send(err);
    }
}