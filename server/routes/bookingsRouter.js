const express = require('express');
const bookingsController = require('../controllers/bookingsController');
const autorisation = require('../middleware/tokenValidation'); // Import the tokenValidation.js file
const  {validateBookingData } = require('../middleware/validateBookingData'); // Import the validateAndCleanBookingData function from the validateBookingData.js file

const router = express.Router();

router.post('/', autorisation.permission, validateBookingData, bookingsController.createBooking);
router.get('/', bookingsController.getAllBookings);
router.get('/:id', bookingsController.getOneBooking);
router.put('/:id', autorisation.permission, validateBookingData, bookingsController.updateBooking);
router.delete('/:id', autorisation.permission, bookingsController.deleteBooking);

module.exports = router;