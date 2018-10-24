var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Scan Endpoints */
router.get('/api/scans', db.getAllScans);
router.get('/api/scans/:id', db.getSingleScan);
router.post('/api/scans', db.createScan);
router.put('/api/scans/:id', db.updateScan);
router.delete('/api/scans/:id', db.removeScan);

/* Event Endpoints */
router.get('/api/events',db.getAllEvents);
router.get('/api/events/:id', db.getSingleEvent);
router.post('/api/events', db.createEvent);
router.put('/api/events/:id', db.updateEvent);
router.delete('/api/events/:id', db.removeEvent);


/*Event Time Endpoints */
router.get('/api/eventtimes/:id',db.getEventTimes);
router.post('/api/eventtimes', db.createEventTime);
router.put('/api/eventtimes/:id', db.updateEventTime);
router.delete('/api/eventtimes/:id', db.removeEventTime);


module.exports = router;
