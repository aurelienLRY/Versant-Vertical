const express = require('express');
const activityController = require('../controllers/activityController');
const autorisation = require('../middleware/validate/tokenValidation'); // Import the tokenValidation.js file
const  {validateActivityData } = require('../middleware/validate/valideActivityData'); // Import the validateAndCleanActivityData function from the valideActivityData.js file

const router = express.Router();

router.post('/', autorisation.permission, validateActivityData, activityController.createActivity);
router.get('/', activityController.getAllActivities);
router.get('/:id', activityController.getOneActivity);
router.put('/:id', autorisation.permission, validateActivityData, activityController.updateActivity);
router.delete('/:id', autorisation.permission, activityController.deleteActivity);

module.exports = router;