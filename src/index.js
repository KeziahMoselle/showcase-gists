require('dotenv').config()

// Jobs to load
const jobs = [
  'last-activity',
  'last-tweet'
]

// Load jobs
const jobsModules = []

jobs.forEach(job => {
  jobsModules.push(require(`./jobs/${job}`))
})

// Run jobs
for (const job of jobsModules) {
  job()
}
