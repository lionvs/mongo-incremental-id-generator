var test = require('tape')
var config = require('../config')
var generator = require('../index')(config.testConnection)
var db = require('mongojs')(config.testConnection)
var wait = global.setImmediate || process.nextTick

function clearDB (t, callback) {
  db.collection(config.collection).remove({}, function (err, res) {
    t.error(err)
    callback()
  })
}

test('generate id test', function (t) {
  var key = 'simple'
  clearDB(t, function () {
    generator.generateId(key, 2, function (err, value) {
      t.error(err)
      t.equal(value, 2)
      generator.generateId(key, 3, function (err, value) {
        t.error(err)
        t.equal(value, 5)
        t.end()
      })
    })
  })
})

wait(function () {
  test('end', function (t) {
    t.end()
    process.exit()
  })
})
