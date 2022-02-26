const express = require('express');

const restaurants = require('./schemas/restaurants');
// const dishes = require('./schemas/dishes');
// const cusines = require('./schemas/cusines');
// const features = require('./schemas/features');

const router = express.Router();

router.use('/restaurants', restaurants);
// router.use('/dishes', dishes);
// router.use('/cusines', cusines);
// router.use('/features', features);

module.exports = router;

