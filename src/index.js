require('dotenv').config()

// Jobs to load
const jobs = [
  //'last-activity',
  //'last-tweet',
  //'wakatime-stats'
]

// Load jobs
const jobsModules = []

jobs.forEach(job => {
  jobsModules.push(require(`./jobs/${job}`))
})

// No jobs found
if (jobsModules.length === 0) {
  const { getGistsId } = require('./libs/gist')
  getGistsId()
  //throw new Error('No jobs to load. Make sure you have at least 1 job uncommented.')
}

// Run jobs
for (const job of jobsModules) {
  console.log(`Running ${job.name} job.`)
  job()
}
