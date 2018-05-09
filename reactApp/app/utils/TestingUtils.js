const galleries = [
  '111',
  '116',
  '155',
  '161',
  '201',
  '204',
  '226',
  '244',
  '265',
]

let galleryChangeInterval = null

const getRandomGalleryId = () =>
  galleries[Math.floor(Math.random() * galleries.length - 1 + 1)]

const simulateGalleryChanges = (dispatcher, interval = 5000) => {
  if (galleryChangeInterval) {
    return true
  }

  dispatcher(getRandomGalleryId())

  galleryChangeInterval = setInterval(() => {
    dispatcher(getRandomGalleryId())
  }, interval)

  return true
}

export default {
  getRandomGalleryId,
  simulateGalleryChanges,
}
