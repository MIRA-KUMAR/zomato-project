const router = require('express').Router();

const BubbleChart = require('./bubbleChart');

router.get('/bubbleChart', BubbleChart);

module.exports = router;