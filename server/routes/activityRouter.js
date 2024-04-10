const express = require('express');
const activityController = require('../controllers/activityController');
const autorisation = require('../middleware/tokenValidation'); // Import the tokenValidation.js file
const  {validateActivityData } = require('../middleware/valideActivityData'); // Import the validateAndCleanActivityData function from the valideActivityData.js file

const router = express.Router();

router.post('/', autorisation.permission, validateActivityData, activityController.createActivity);
router.get('/', activityController.getAllActivities);
router.get('/:id', activityController.getOneActivity);
router.put('/:id', autorisation.permission, activityController.updateActivity);
router.delete('/:id', autorisation.permission, activityController.deleteActivity);

module.exports = router;