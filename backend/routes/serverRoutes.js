const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');

router.post('/', serverController.createServer);
router.get('/', serverController.getAllServers);

module.exports = router;