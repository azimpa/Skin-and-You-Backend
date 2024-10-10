const express = require('express');
const router = express.Router()
const { getInstagramFeed } = require('../controllers/commonController.js')

router.get('/', getInstagramFeed);

module.exports = router;