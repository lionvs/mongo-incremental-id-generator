var test = require('tape')
var config = require('../config')
var generator = require('../index')(config.testConnection)
var h = require('./helper')

test('reset id test', function (t) {
  var key = 'simple'
  var newId = 1
  h.clearDB(t, function () {
    h.insert(t, { _id: key, value: 2 }, function () {
      generator.resetId(key, newId, function (err, res) {
        t.error(err)
        t.equal(res, newId)
        generator.pickLastId(key, function (err, res) {
          t.error(err)
          t.equal(res, newId)
          t.end()
        })
      })
    })
  })
})

test('skip newId parameter', function (t) {
  var key = 'simple'
  h.clearDB(t, function () {
    generator.resetId(key, function (err, value) {
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
      generator.resetId(key, 2)
    })
    t.end()
  })
})

test('bad newId parameter test', function (t) {
  var key = 'simple'
  h.clearDB(t, function () {
    t.throws(function () {
      generator.resetId(key, 'simple')
    })
    t.end()
  })
})

