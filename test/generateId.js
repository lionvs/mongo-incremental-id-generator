var test = require('tape')
var config = require('../config')
var generator = require('../index')(config.testConnection)
var h = require('./helper')

test('generate several id for the same key test', function (t) {
  var key = 'simple'
  h.clearDB(t, function () {
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

test('skip step parameter', function (t) {
  var key = 'simple'
  h.clearDB(t, function () {
    generator.generateId(key, function (err, value) {
      t.error(err)
      t.equal(value, 1)
      t.end()
    })
  })
})

test('generate several id for different keys test', function (t) {
  var key1 = 'simple1'
  var key2 = 'simple2'
  h.clearDB(t, function () {
    generator.generateId(key1, 2, function (err, value) {
      t.error(err)
      t.equal(value, 2)
      generator.generateId(key2, 3, function (err, value) {
        t.error(err)
        t.equal(value, 3)
        t.end()
      })
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

test('bad step parameter test', function (t) {
  var key = 'simple'
  h.clearDB(t, function () {
    t.throws(function () {
      generator.generateId(key, key)
    })
    t.end()
  })
})

