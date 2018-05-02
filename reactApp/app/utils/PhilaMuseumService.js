const baseUrl = 'http://167.99.5.121:3000/'

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

export const likeSong = (artId, song) => {
  const url = `${baseUrl}api/museum/artwork/${artId}/song/like`
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
  const url = `${baseUrl}api/spotify/search?q="${searchTerm}"`
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log('search', err)
    })
}


export const getReccommendations = (genres) => {
  const url = `${baseUrl}museum/artwork/recommendations/genres`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(genres),
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

export default {
  addSong,
  getArtList,
  getArtDetail,
  getPopularGenres,
  likeSong,
  search,
}
