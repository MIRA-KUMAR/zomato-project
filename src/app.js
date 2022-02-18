const express = require('express'); // import
const morgan = require('morgan');

const readRestaurants = require('./restaurants/read');

const app = express();

app.use(express.json()); // middlewares
app.use(morgan('dev'));

app.get('/restaurants', readRestaurants); // routing

app.listen(3000, function () {
    console.log('Server started!');
});

// mongoose, Joi / Ajv
