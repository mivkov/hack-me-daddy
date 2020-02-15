var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/apiController')

// POST profile URL to Facebook for text analysis
router.post('/grabFB/', api_controller.grabFB);

// POST from extension to send text to Azure for analysis
router.post('/analyze-text/', api_controller.analyze_text);

// POST from extension to send image to Azure for analysis
// will respond to 
router.post('/analyze-image/', api_controller.analyze_image);

module.exports = router;