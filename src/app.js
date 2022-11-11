const express = require('express'); // import
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models');

const routes = require('./routes');

const app = express();

app.use(cors({
    origin: '*'
}))
app.use(express.json()); // middlewares
app.use(morgan('dev')); // logs

app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/zomato', (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    app.listen(3000, function () { // server, services
        console.log('Server started!');
    });
});
