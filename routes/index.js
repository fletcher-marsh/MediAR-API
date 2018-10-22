var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/scans', db.getAllScans);
router.get('/api/scans/:id', db.getSingleScan);
router.post('/api/scans', db.createScan);
router.put('/api/scans/:id', db.updateScan);
router.delete('/api/scans/:id', db.removeScan);

module.exports = router;
