var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString;
if (process.env.NODE_ENV === "prod") {
  connectionString = 'postgres://ipdbyoxmmnzdyn:0d63d49d3dea6c50cf524e1f7e0153f20ea30108c024c48263d5f3d751b243a5@ec2-107-20-211-10.compute-1.amazonaws.com:5432/ddrpd50b0fhsgn';
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
          data: data,
          message: 'Retrieved ALL Scans'
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
          data: data,
          message: 'Retrieved ALL Scans'
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
          status: 'success',
          message: 'Inserted one scan'
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
          status: 'success',
          message: 'Updated Scan'
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
          status: 'success',
          message: `Removed ${result.rowCount} Scan`
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
  removeScan: removeScan
};