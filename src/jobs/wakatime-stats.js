const axios = require('axios')
const save = require('../libs/gist')

const API_KEY = Buffer.from(process.env.WAKATIME_KEY).toString('base64')


/**
 * Get last year WakaTime total hours coded
 *
 * @returns
 */
async function getWakatimeStats () {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://wakatime.com/api/v1/users/current/stats/last_year',
      headers: {
        'Authorization': `Basic ${API_KEY}`
      }
    })
  
    const message = data.data.human_readable_total_including_other_language

    console.log(message)
  
    return save('WakaTime', {
      'Last year WakaTime stats :': {
        content: message
      }
    })
  } catch (error) {
    console.log(`Skipping WakaTime job.\n(Error: ${error})`)
  }
}

module.exports = getWakatimeStats