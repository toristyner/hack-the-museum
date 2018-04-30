const baseUrl = 'http://167.99.5.121:3000/'

export const getArtList = (galleryId) => {
  console.log('Get Gallery Items')
  const url = `${baseUrl}api/museum/locations/${galleryId}`
  return fetch(url)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getArtDetail = (galleryId, artId) => {
  // const url = `${baseUrl}api/museum/artwork/${artId}`
  const url = 'http://167.99.5.121:3000/api/museum/artwork/42394'
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
    })
}

export const addSong = (artId) => {
  const url =  `${baseUrl}museum/artwork/${artId}/song`
  return fetch(url)
  .then(response => response.json())
  .catch((err) => {
    console.log(err)
  })
}

export const getReccommendations = (genres) => {
  const url = `${baseUrl}museum/artwork/recommendations/genres`
  return fetch(url)
  .then(response => response.json())
  .catch((err) => {
    console.log(err)
  })
}

export const getPopularGenres = () => {
  const url = `${baseUrl}/genres`
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log('getPopularGenres', err)
    })
}

export default {
  getArtList,
  getArtDetail,
}
