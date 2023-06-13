const express = require('express');
const router = express.Router();
const { getCountries, getById } = require('../controllers/getCountries');

router.get('/', getCountries);
router.get('/:id', getById);

    

module.exports = router;

















