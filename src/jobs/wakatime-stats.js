const axios = require('axios')
const save = require('../libs/gist')

const API_KEY = Buffer.from(process.env.WAKATIME_KEY).toString('base64')

async function getWakatimeStats () {
  const { data } = await axios({
    method: 'GET',
    url: 'https://wakatime.com/api/v1/users/current/stats/last_year',
    headers: {
      'Authorization': `Basic ${API_KEY}`
    }
  })

  const message = data.data.human_readable_total_including_other_language

  return save('WakaTime', {
    'Last year WakaTime stats :': {
      content: message
    }
  })
}

module.exports = getWakatimeStats