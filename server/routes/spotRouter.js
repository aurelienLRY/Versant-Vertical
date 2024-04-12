const express = require('express');
const spotController = require('../controllers/spotController');
const autorisation = require('../middleware/tokenValidation'); // Import the tokenValidation.js file
const  {validateSpotData } = require('../middleware/validateSpotData'); // Import the validateAndCleanSpotData function from the validateSpotData.js file

const router = express.Router();

router.post('/', autorisation.permission, validateSpotData, spotController.createSpot);
router.get('/', spotController.getAllSpots);
router.get('/:id', spotController.getOneSpot);
router.put('/:id', autorisation.permission,validateSpotData ,spotController.updateSpot);
router.delete('/:id', autorisation.permission, spotController.deleteSpot);

module.exports = router;