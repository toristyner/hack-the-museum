import queue from '../../../shared/queue'
import museumApi from '../services/api'
import cache from '../services/cache'
import artworkService from '../services/artwork'

const config = {
  addDelay: 3500,
  updateDelay: 3500
}
const queues = {
  add: 'Add Artwork',
  update: 'Update Missing Artwork'
}

const addArtwork = queue(queues.add)
const updateArtwork = queue(queues.update)

addArtwork.process(addJob)
updateArtwork.process(updateJob)

addArtwork.on('drained', () => console.log(`${queues.add}: Complete`))
updateArtwork.on('drained', () => console.log(`${queues.update}: Complete`))

addArtwork.empty()
updateArtwork.empty()

async function addJob(job, done) {
  const { locationId, objectId } = job.data

  if (!locationId || !objectId) {
    console.error('Invalid Job', locationId, objectId)
    return done()
  }

  try {
    console.log(`Adding => Room: ${locationId} Object: ${objectId}`)

    const artwork = await museumApi.getArtwork(objectId)

    if (artwork) {
      cache.setJson(objectId, artwork)
    }

    setTimeout(async () => done(), config.addDelay)
  } catch (error) {
    console.error(error)
    done()
  }
}

async function updateJob(job, done) {
  const { locationId, artworkIds } = job.data

  if (!locationId || !artworkIds) {
    console.error('Missing Params', locationId)
    return done()
  }

  console.log(`Validating => Room: ${locationId}`)

  try {
    artworkIds.forEach(async objectId => {
      const artwork = await cache.getJson(objectId)

      if (!artwork) {
        addArtwork.add({ locationId, objectId })
      }
    })

    setTimeout(() => done(), config.updateDelay)
  } catch (error) {
    console.error(error)
    done()
  }
}

export default {
  addArtwork: (artwork = []) => {
    artwork.forEach(art => addArtwork.add(art))
  },
  updateArtwork: ({ locationId, artworkIds }) =>
    updateArtwork.add({ locationId, artworkIds })
}
