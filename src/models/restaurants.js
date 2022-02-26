const mongoose = require('mongoose');

mongoose.model(
    'Restaurant',
    mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String
        },
        cuisine: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisine',
        }],
        topDishes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish',
        }],
        "price": {
            type: Number,
        },
        "diningRating": Number,
        "diningRatingCount": Number,
        "deliveryRating": Number,
        "deliveryRatingCount": Number,
        features: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feature',
        }]
    }, {
        timestamps: true,
    })
)
