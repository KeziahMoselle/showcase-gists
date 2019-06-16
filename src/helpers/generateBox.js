const boxen = require('boxen')

function generateBox (message) {
  return boxen(message, {
    align: 'center'
  })
}

module.exports = generateBox