const express = require('express');
const activityController = require('../controllers/activityController');
const autorisation = require('../middleware/tokenValidation');

const router = express.Router();

router.post('/', autorisation.permission, activityController.createActivity);
router.get('/', activityController.getAllActivities);
router.get('/:id', activityController.getOneActivity);
router.put('/:id', autorisation.permission, activityController.updateActivity);
router.delete('/:id', autorisation.permission, activityController.deleteActivity);

module.exports = router;