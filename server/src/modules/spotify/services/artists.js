import axios from 'axios'
import spotifyAPI from './api'

export default {
  detail
}

function detail(id) {
  return spotifyAPI.request({
    url: `/artists/${id}`
  })
}
