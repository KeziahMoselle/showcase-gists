const Octokit = require('@octokit/rest')

const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN,
  userAgent: 'activity-to-gist 1.0.0'
})

module.exports = octokit