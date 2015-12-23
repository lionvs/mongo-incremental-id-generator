var test = require('tape')
var config = require('../config')
var generator = require('../index')(config.testConnection)
var h = require('./helper')

test('pick last id for generated ids test', function (t) {
  var key = 'simple'
  h.clearDB(t, function () {
    generator.generateId(key, 2, function (err, value) {
      t.error(err)
      generator.pickLastId(key, function (err, value) {
        t.error(err)
        t.equal(value, 2)
        t.end()
      })
    })
  })
})

test('pick last id for new key test', function (t) {
  var key = 'simple'
  h.clearDB(t, function () {
    generator.pickLastId(key, function (err, value) {
      t.error(err)
      t.equal(value, 0)
      t.end()
    })
  })
})

test('bad key parameter test', function (t) {
  var key = { a: 'simple' }
  h.clearDB(t, function () {
    t.throws(function () {
      generator.generateId(key, 2)
    })
    t.end()
  })
})
