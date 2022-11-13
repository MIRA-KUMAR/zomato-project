const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const RestaurantModel = mongoose.model('Restaurant');
    const data = await RestaurantModel.aggregate([
        {
            $project: {
                name: true,
                location: true,
                price: {
                    $divide: ['$price', 100]
                },
                diningRating: true,
                deliveryRating: true,
            }
        },
    ]);

    return res.send({
        success: true,
        value: data,
        error: null
    })
};
