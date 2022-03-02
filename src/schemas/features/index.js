const express = require('express');

const read = require('./read');
const del = require('./delete');
const update = require('./update');
const create = require('./create');

const router = express.Router();

router.get('/', read);
router.post('/', create);
router.delete('/:id', del);
router.put('/:id', update);

module.exports = router;