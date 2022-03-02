const express = require('express');

const restaurants = require('./schemas/restaurants');
const dishes = require('./schemas/dishes');
const cuisines = require('./schemas/cuisines');
const features = require('./schemas/features');

const router = express.Router();

router.use('/restaurants', restaurants);
router.use('/dishes', dishes);
router.use('/cuisines', cuisines);
router.use('/features', features);

module.exports = router;

