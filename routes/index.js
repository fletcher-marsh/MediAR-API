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
router.get('/api/events/:lat/:long', db.getEventsByLocation);
router.get('/api/events/:id', db.getSingleEvent);
router.post('/api/events', db.createEvent);
router.put('/api/events/:id', db.updateEvent);
router.delete('/api/events/:id', db.removeEvent);


/*Event Time Endpoints */
router.post('/api/events', db.createEventTime);
router.put('/api/events/:id', db.updateEventTime);
router.delete('/api/events/:id', db.removeEventTime);


module.exports = router;
