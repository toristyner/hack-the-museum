import axios from 'axios'
import spotifyAPI from './api'
import spotifyCache from '../services/cache'

export default {
  detail
}

async function detail(id) {
  let artist = await spotifyCache.getJson(id)
  if (!artist) {
    artist = await spotifyAPI.request({
      url: `/artists/${id}`
    })

    if (artist) {
      spotifyCache.setJson(id, artist)
    }
  }

  return artist || {}
}
