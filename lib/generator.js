var mongojs = require('mongojs')
var config = require('../config')
var CustomError = require('../errors/custom-error')

var Generator = function (connString) {
  this.db = mongojs(connString)
}

Generator.prototype.generateId = function (key, step, callback) {
  if (typeof step === 'function') return this.generateId(key, null, step)
  if (step == null) {
    step = 1
  }
  if (step === 0 || isNaN(step)) {
    throw new CustomError('Bad input parameter: step! Should be number. ', step)
  }
  if (typeof key !== 'string') {
    throw new CustomError('Bad input parameter: key! Should be string. ', key)
  }

  this.db.collection(config.collection).findAndModify({
    query: { _id: key },
    update: {
      $inc: { 'value': step }
    },
    new: true,
    upsert: true
  }, function (err, result) {
    if (err) {
      return callback(err)
    }
    return callback(null, result.value)
  })
}

Generator.prototype.pickLastId = function (key, callback) {
  if (typeof key !== 'string') {
    throw new CustomError('Bad input parameter: key! Should be string. ', key)
  }
  this.db.collection(config.collection).findOne({ _id: key }, function (err, value) {
    if (err) {
      return callback(err)
    }
    return callback(null, value ? value.value : 0)
  })
}

Generator.prototype.resetId = function (key, newId, callback) {
  if (typeof newId === 'function') return this.resetId(key, null, newId)
  if (newId == null) {
    newId = 0
  }
  if (isNaN(newId)) {
    throw new CustomError('Bad input parameter: newId! Should be number. ', newId)
  }
  if (typeof key !== 'string') {
    throw new CustomError('Bad input parameter: key! Should be string. ', key)
  }
  this.db.collection(config.collection).findAndModify({
    query: {_id: key},
    update: {
      $set: { 'value': newId }
    },
    new: true,
    upsert: true
  }, function (err, value) {
    if (err) {
      return callback(err)
    }
    return callback(null, value.value)
  })
}

module.exports = Generator
