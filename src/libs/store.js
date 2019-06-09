const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({  })
  .write()

function set (key, value) {
  db.set(key, value)
    .write()
}

function get (key) {
  return db.get(key).value()
}

module.exports = {
  set,
  get
}