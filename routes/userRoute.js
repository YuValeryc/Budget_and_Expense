const express = require('express');
const users = require('../controllers/userController'); 

const router = express.Router();

router.post('/register', users.register);
router.post('/login', users.login);

module.exports = router;
