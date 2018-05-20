import * as actions from '../actionTypes'

const baseUrl = 'http://167.99.5.121:3000/'
const publicUrl = 'http://artbeats.info'
const twitterUrl = 'https://twitter.com/intent/tweet'

export const getArtList = (galleryId) => {
  const url = `${baseUrl}api/museum/locations/${galleryId}`
  return fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      throw response
    })
}

export const getArtRecommendations = (genres) => {
  const url = `${baseUrl}api/museum/artwork/recommendations/genres`
  return fetch(url, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ genres }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      throw response
    })
}

export const getArtDetail = (galleryId, artId) => {
  const url = `${baseUrl}api/museum/artwork/${artId}`
  return fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      throw response
    })
}

export const addSong = (artId, song) => {
  const url = `${baseUrl}api/museum/artwork/${artId}/song`
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(song),
  })
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
    })
}

export const updateSong = ({ artId, song, type }) => {
  const action = type === actions.LIKE_SONG ? 'like' : 'dislike'
  const url = `${baseUrl}api/museum/artwork/${artId}/song/${action}`

  return fetch(url, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(song),
  })
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
    })
}

export const search = (searchTerm) => {
  const url = `${baseUrl}api/spotify/search?q=${searchTerm}`
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log('search', err)
    })
}


export const getRecommendations = (genres) => {
  const url = `${baseUrl}api/museum/artwork/recommendations/genres`

  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ genres }),
  })
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
    })
}

export const getPopularGenres = () => {
  const url = `${baseUrl}api/spotify/genres`
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log('getPopularGenres', err)
    })
}

export const getShareUrl = ({ artworkId, songId }) =>
  `${publicUrl}/museum/share?songId=${songId}&artworkId=${artworkId}`

export const getTwitterUrl = ({ artworkId, songId }) =>
  `${twitterUrl}?url=${encodeURIComponent(getShareUrl({ artworkId, songId }))}`

export default {
  addSong,
  getArtList,
  getArtDetail,
  getPopularGenres,
  getRecommendations,
  updateSong,
  search,
  getTwitterUrl,
  getShareUrl,
}
