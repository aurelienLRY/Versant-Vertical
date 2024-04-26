const express = require('express');
const customerSessionController = require('../controllers/customerSessionContoller');
const autorisation = require('../middleware/validate/tokenValidation'); // Import the tokenValidation.js file
const  {validateCustomerSession} = require('../middleware/validate/validateCustomerSession'); // Import the validateAndCleanCustomerSessionData function from the validateCustomerSessionData.js file

const router = express.Router();

router.post('/', autorisation.permission, validateCustomerSession, customerSessionController.createCustomerSession); // Create a new customer session
router.get('/', customerSessionController.getAllCustomerSessions); // Get all customer sessions
router.get('/:id', customerSessionController.getOneCustomerSession); // Get one customer session
router.put('/:id', autorisation.permission, validateCustomerSession, customerSessionController.updateCustomerSession); // Update a customer session
router.delete('/:id', autorisation.permission, customerSessionController.deleteCustomerSession); // Delete a customer session

module.exports = router;