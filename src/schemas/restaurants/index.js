const express = require('express');

const read = require('./read');
const readOne = require('./readOne');
const create = require('./create');
const del = require('./delete');
const update = require('./update');
const AddTopDishes = require('./addTopDishes');

const router = express.Router();

router.get('/', read);
router.post('/', create);
router.get('/:id', readOne);
router.delete('/:id', del);
router.put('/:id', update);

router.post('/:id/topDishes', AddTopDishes);

module.exports = router;
