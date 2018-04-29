import axios from 'axios'
import spotifyAPI from './api'

export default {
  search
}

function search(q) {
  return spotifyAPI
    .request({
      url: `/search`,
      params: {
        q,
        type: 'track'
      }
    })
    .then(({ tracks }) => formatSearchResults(tracks.items))
}

function formatSearchResults(tracks) {
  return tracks.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0],
    images: track.album.images[0],
    uri: track.uri
  }))
}
