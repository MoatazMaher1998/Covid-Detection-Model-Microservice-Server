const express = require('express');
const router = express.Router();
const path = require('path');
const mode = require('../Configs/configs');
router.get('/*', function (req, res) {
  res.sendFile(path.join(path.parse(__dirname).dir, 'build', 'index.html'));
});
  module.exports = router;
