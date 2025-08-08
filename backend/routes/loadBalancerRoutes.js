const express = require('express');
const router = express.Router();
const lbController = require('../controllers/loadBalancerController');

router.post('/', lbController.createLoadBalancer);
router.post('/assign', lbController.assignServer);
router.get('/', lbController.getAllLoadBalancers);

module.exports = router;