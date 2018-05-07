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

let gelleryChangeInterval = null

const getRandomGalleryId = () =>
  galleries[Math.floor(Math.random() * galleries.length - 1 + 1)]

const simulateGalleryChanges = (dispatcher, interval = 5000) => {
  if (gelleryChangeInterval) {
    return true
  }

  dispatcher(getRandomGalleryId())

  gelleryChangeInterval = setInterval(() => {
    dispatcher(getRandomGalleryId())
  }, interval)

  return true
}

export default {
  getRandomGalleryId,
  simulateGalleryChanges,
}
