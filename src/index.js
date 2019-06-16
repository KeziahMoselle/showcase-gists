require('dotenv').config()
const { getGistsId } = require('./libs/gist')

// Jobs to load
const jobs = [
  'lastActivity',
  'lastTweet',
  'WakaTime'
]

// Fetch Gist id if missing
getGistsId(jobs)

// Load jobs
const jobsModules = []

jobs.forEach(job => jobsModules.push(require(`./jobs/${job}`)))

// No jobs found
if (jobsModules.length === 0) {
  throw new Error('No jobs to load. Make sure you have at least 1 job uncommented.')
}

// Run jobs
for (const job of jobsModules) {
  console.log(`Running ${job.name} job.`)
  job()
}
