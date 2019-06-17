const octokit = require('../libs/octokit')
const { save } = require('../libs/gist')
const generateBox = require('../helpers/generateBox')

/**
 * Fetch the last public event from GitHub
 *
 * @returns
 */
async function getLastActivity () {
  try {
    const { data } = await octokit.activity.listEventsForUser({
      username: process.env.GITHUB_USERNAME
    })
  
    // Filtering data
  
    const event = data[0]
    const repo = event.repo.name
    let message
  
    switch (event.type) {
      case 'IssuesEvent':
        message = `${event.payload.action} issue #${event.payload.issue.number} ${event.payload.issue.title}`
        break
  
      case 'IssueCommentEvent':
        message = `Commented on #${event.payload.issue.number} ${event.payload.issue.title}`
        break
  
      case 'CreateEvent':
        message = `Created ${event.payload.ref_type} ${(event.payload.ref ? event.payload.ref : '')}`
        break
  
      case 'PushEvent':
        if (event.payload.size > 1) {
          message = 'Pushed commits: ';
          for (const commit in event.payload.commits){
            message += `${event.payload.commits[commit].message} ;`
          }
        } else {
          message = `Pushed commit: ${event.payload.commits[0].message}`
        }
        break
  
      case 'DeleteEvent':
        message = `Deleted ${event.payload.ref_type} ${(event.payload.ref ? event.payload.ref : '')}`
        break
  
      case 'PullRequestEvent':
        message = `${event.payload.action} PR #${event.payload.number} ${event.payload.pull_request.title}`
        break
  
      case 'WatchEvent':
        message = `Watched ${event.repo.name}`
        break
  
      case 'PublicEvent':
        message = `Made public ${event.repo.name}`
        break
    
      default:
        message = 'This type of event is not supported.'
        break
    }
  
    
    message = generateBox(`[${repo}]\n> ${message}`)
    console.log(message)
  
    return save('lastActivity', {
      'lastActivity': {
        content: message
      }
    })
  } catch (error) {
    console.log(`Skipping lastActivity job.\n(Error: ${error})`)
  }
}

module.exports = getLastActivity