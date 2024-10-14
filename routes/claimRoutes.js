const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

// Define routes
router.post('/claim', claimController.claimPoints);
router.get('/history', claimController.getClaimHistory);

module.exports = router;
