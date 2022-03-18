const express = require('express');

const search = require('./search');
const aggs = require('./aggs');

const router = express.Router();

router.post('/', search);
router.post('/aggs', aggs);

module.exports = router;
