const Twitter = require('twitter')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs-extra')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const endpoint = 'statuses/user_timeline'
const params = {
  screen_name: 'eleazarbr',
  include_rts: true
}
const callback = (error, tweets, response) => {
  if (!error) {
    fs.outputJSON('./tweets/tweets.json', tweets.slice(0, 10), {
      spaces: 4
    })
  } else {
    fs.outputJSON('./errors.json', error)
  }
}

export default function NuxtTwitter(config) {
  this.nuxt.hook('build:before', (generator) => {
    client.get(endpoint, params, callback)
  })
}
