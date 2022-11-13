const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./models');
const auth = require('./middlewares/auth');
const routes = require('./routes');

const app = express();

app.use(cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/', auth, routes);

mongoose.connect('mongodb://localhost:27017/zomato', (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    app.listen(3000, function () {
        console.log('Server started!');
    });
});
