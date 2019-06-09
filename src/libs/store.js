const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({  })
  .write()

/**
 * Set a pair key/value
 *
 * @param {string} key
 * @param {string} value
 */
function set (key, value) {
  db.set(key, value)
    .write()
}


/**
 * Get the key from JSON
 *
 * @param {string} key
 * @returns
 */
function get (key) {
  return db.get(key).value()
}

module.exports = {
  set,
  get
}