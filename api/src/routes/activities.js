const express = require('express');
const { createActivity, getActivities, deleteActivity } = require('../controllers/activities');
const router = express.Router();

router.post('/', createActivity);
router.get('/', getActivities);
router.post('/delete/:id', deleteActivity)

module.exports = router;