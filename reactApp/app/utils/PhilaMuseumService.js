const baseUrl = 'http://167.99.5.121:3000/api/museum/locations/'

export const getArtList = (galleryId) => {
  console.log('Get Gallery Items')
  const url = `${baseUrl}${galleryId}`
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
    })
}

export const getArtDetail = (galleryId, artId) => {
  const url = `${baseUrl}${galleryId}/artwork/${artId}`
  console.log(url)
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
