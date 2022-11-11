const express = require('express');

const search = require('./search');
const aggs = require('./aggs');

const router = express.Router();

router.get('/', search);
router.post('/aggs', aggs);

module.exports = router;
