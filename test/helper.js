var config = require('../config')
var db = require('mongojs')(config.testConnection)

function clearDB (t, callback) {
  db.collection(config.collection).remove({}, function (err, res) {
    t.error(err)
    callback()
  })
}

function insert (t, document, callback) {
  db.collection(config.collection).insert(document, function (err, res) {
    t.error(err)
    callback(err, res)
  })
}

module.exports = {
  clearDB: clearDB,
  insert: insert
}
