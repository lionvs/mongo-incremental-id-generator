var Generator = require('./lib/generator')
module.exports = function (connString) {
  var generator = new Generator(connString)
  return generator
}
