var mongojs = require('mongojs')
var config = require('../config')
var CustomError = require('../errors/custom-error')

var Generator = function (connString) {
  this.db = mongojs(connString)
}

Generator.prototype.generateId = function (key, step, callback) {
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

module.exports = Generator
