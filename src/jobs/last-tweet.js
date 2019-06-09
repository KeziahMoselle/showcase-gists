const save = require('../libs/gist')
const T = require('../libs/twitter')


/**
 * Fetch the last tweet
 *
 * @returns
 */
async function getLastTweet () {
  const { data } = await T.get('statuses/user_timeline', {
    screen_name: process.env.TWITTER_USERNAME,
    count: 1
  })

  const tweet = data[0]
  let message

  if (tweet.retweeted) {
    message = `RT: ${tweet.retweeted_status.user.name}\n> ${tweet.retweeted_status.text}`
  } else if (tweet.in_reply_to_screen_name) {
    message = `Replied to ${tweet.in_reply_to_screen_name}:\n> ${tweet.text}`
  } else {
    message = `Tweet: ${tweet.text}`
  }

  console.log(message)

  return save('lastTweet', {
    'Last Tweet :': {
      content: message
    }
  })
}

module.exports = getLastTweet