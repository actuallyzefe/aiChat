const express = require('express');
const { generateImage, chat } = require('../controllers/aiController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/chatwithAI', chat);

module.exports = router;
