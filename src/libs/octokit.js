const Octokit = require('@octokit/rest')
const pkg = require('../../package.json')

const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN,
  userAgent: `${pkg.name} (${pkg.version})`
})

module.exports = octokit