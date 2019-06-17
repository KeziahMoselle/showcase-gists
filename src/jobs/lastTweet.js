const { save } = require('../libs/gist')
const T = require('../libs/twitter')
const generateBox = require('../helpers/generateBox')

/**
 * Fetch the last tweet
 *
 * @returns
 */
async function getLastTweet () {
  try {
    const { data } = await T.get('statuses/user_timeline', {
      screen_name: process.env.TWITTER_USERNAME,
      count: 1
    })
  
    const tweet = data[0]
    let message
    let link
  
    if (tweet.retweeted) {
      message = `🔁 RT: ${tweet.retweeted_status.user.name}\n> ${tweet.retweeted_status.text}`
      link = getTwitterLink(tweet.retweeted_status.user.screen_name, tweet.retweeted_status.id_str)
    } else if (tweet.in_reply_to_screen_name) {
      message = `💬 Replied to ${tweet.in_reply_to_screen_name}:\n> ${tweet.text}`
      link = getTwitterLink(tweet.user.screen_name, tweet.id_str)
    } else {
      message = `💬 Tweet: ${tweet.text}`
      link = getTwitterLink(tweet.user.screen_name, tweet.id_str)
    }

    message = generateBox(`${message}\n${link}`)
    console.log(message)
  
    return save('lastTweet', {
      'lastTweet': {
        content: message
      }
    })
  } catch (error) {
    console.log(`Skipping lastTweet job.\n(Error: ${error})`)
  }
}

/**
 * Generate a link to a tweet
 *
 * @param {string} name
 * @param {string} id
 * @returns
 */
const getTwitterLink = (name, id) => `https://twitter.com/${name}/status/${id}`

module.exports = getLastTweet