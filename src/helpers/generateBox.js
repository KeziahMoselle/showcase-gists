const boxen = require('boxen')


/**
 * Create a unicode box
 *
 * @param {string} message
 */
function generateBox (message) {
  return boxen(message, {
    align: 'center'
  })
}

module.exports = generateBox