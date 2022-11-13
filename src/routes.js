const express = require('express');

const restaurants = require('./schemas/restaurants');
const dishes = require('./schemas/dishes');
const cuisines = require('./schemas/cuisines');
const features = require('./schemas/features');
const search = require('./schemas/search');
const calculations = require('./schemas/calculations');

const router = express.Router();

router.use('/restaurants', restaurants);
router.use('/dishes', dishes);
router.use('/cuisines', cuisines);
router.use('/features', features);
router.use('/search', search);

router.use('/calculations', calculations)

module.exports = router;

