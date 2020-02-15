var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/apiController')

// POST profile URL to Facebook for text analysis
router.post('/grabFB/', );

// POST from extension to send text to Azure for analysis
router.post('/analyze-text/');

router.post('/analyze-image/');

module.exports = router;