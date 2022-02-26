const mongoose = require('mongoose');

mongoose.model(
    'Cuisine',
    mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        }
    }, {
        timestamps: true
    })
)
