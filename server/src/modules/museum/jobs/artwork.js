import queue from '../../../shared/queue'
import museumApi from '../services/api'
import cache from '../services/cache'

const addArtwork = queue('Add Artwork')
addArtwork.process(job)

const bufferTime = 1500

async function job(job, done) {
  const { locationId, objectId } = job.data

  if (!locationId || !objectId) {
    console.error('Not found', locationId, objectId)
    done()
  }

  try {
    setTimeout(async () => {
      console.log(`Adding => Room: ${locationId} Object: ${objectId}`)

      const artwork = await museumApi.getArtwork(objectId)

      if (artwork) {
        cache.setJson(objectId, artwork)
      }

      done(null)
    }, bufferTime)
  } catch (error) {
    console.error(error)
    done()
  }
}

export default {
  addArtwork: (artwork = []) => {
    artwork.forEach(art => addArtwork.add(art))
  }
}
