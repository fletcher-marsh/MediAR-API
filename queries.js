var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString;
if (process.env.NODE_ENV === "production") {
  const { DATABASE_URL } = process.env
  connectionString = DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/mediar'; 
}
var db = pgp(connectionString);


// -------------------------------------------------------
// User Scan Queries
// -------------------------------------------------------

function getAllScans(req, res, next) {
  db.any('select * from scans')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleScan(req, res, next) {
  var sID = req.params.id;
  db.any(`select * from scans where id = ${sID}`)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createScan(req, res, next) {
  db.none('insert into scans(media, loc, time)' +
      'values(${media}, ${loc}, current_timestamp)',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateScan(req, res, next) {
  console.log(req.params, req.body);
  db.none('update scans set media=$1, loc=$2 where id=$3',
    [req.body.media, req.body.loc, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeScan(req, res, next) {
  var sID = parseInt(req.params.id);
  db.result('delete from scans where id = $1', sID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}



// -------------------------------------------------------
// User Event Queries
// -------------------------------------------------------

function getAllEvents(req, res, next) {
  db.any('select * from events')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getEventsByLocation(req, res, next) {
  var lat = parseDouble(req.params.lat);
  var long = parseDouble(req.params.long);
  db.any('select * from events where distance(${lat},${long},lat,long) <= 1500')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleEvent(req, res, next) {
  var eID = req.params.id;
  db.any(`select * from events where id = ${eID}`)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createEvent(req, res, next) {
  db.none('insert into events (media, preview, loc, lat, long, desc)' +
      'values(${media}, ${preview}, ${loc}, ${lat}, ${long}, ${desc})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateEvent(req, res, next) {
  console.log(req.params, req.body);
  db.none('update events set media=$1, preview=$2, loc=$3, lat=$4, long=$5, desc=$6, where id=$7',
    [req.body.media, req.body.preview, req.body.loc, req.body.lat, req.body.long, req.body.desc, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEvent(req, res, next) {
  var eID = parseInt(req.params.id);
  db.result('delete from events where id = $1', eID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


// -------------------------------------------------------
// User Event Time Queries
// -------------------------------------------------------



function createEventTime(req, res, next) {
  db.none('insert into eventtimes (time, event_id)' +
      'values(${time}, ${event_id})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateEventTime(req, res, next) {
  console.log(req.params, req.body);
  db.none('update eventtimes set time=$1, where id=$2 and event_id=$3',
    [req.body.media, req.body.loc, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEventTime(req, res, next) {
  var eID = parseInt(req.params.id);
  db.result('delete from events where id = $1', eID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}




module.exports = {
  getAllScans: getAllScans,
  getSingleScan: getSingleScan,
  createScan: createScan,
  updateScan: updateScan,
  removeScan: removeScan,
  getAllEvents: getAllEvents,
  getEventsByLocation: getEventsByLocation,
  getSingleEvent: getSingleEvent,
  createEvent: createEvent,
  updateEvent: updateEvent,
  removeEvent: removeEvent,
  createEventTime: createEventTime,
  updateEventTime: updateEventTime,
  removeEventTime: removeEventTime
};



