const mongoose = require('mongoose');

mongoose.model(
    'Feature',
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
