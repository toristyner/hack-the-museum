import axios from 'axios'
import spotifyAPI from './api'

export default {
  search
}

function search(q) {
  return spotifyAPI.request({
    url: `/search`,
    params: {
      q,
      type: 'track'
    }
  })
}
