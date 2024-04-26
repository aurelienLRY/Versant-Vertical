const express = require('express');
const sessionController = require('../controllers/sessionController');
const autorisation = require('../middleware/validate/tokenValidation'); // Import the tokenValidation.js file
const  {validateSessionData} = require('../middleware/validate/validateSessionData'); // Import the validateAndCleanSessionData function from the validateSessionData.js file

const router = express.Router();

router.post('/', autorisation.permission, validateSessionData, sessionController.createSession);
router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getOneSession);
router.put('/:id', autorisation.permission, validateSessionData, sessionController.updateSession);
router.delete('/:id', autorisation.permission, sessionController.deleteSession);

module.exports = router;