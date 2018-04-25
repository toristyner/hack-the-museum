const baseUrl = 'http://167.99.5.121:3000/api/museum/locations/'

export const getGalleryItems = (galleryId) => {
  console.log('Get Gallery Items')
  const url = `${baseUrl}${galleryId}`
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
    })
}


export const getItemDetail = (galleryId, artId) => {
  const url = `${baseUrl}${galleryId}/artwork/${artId}`
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
    })
}

export default {
  getGalleryItems,
  getItemDetail,
}
