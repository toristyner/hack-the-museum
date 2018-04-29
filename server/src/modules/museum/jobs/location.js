import queue from '../../../shared/queue'
import artworkJob from './artwork'
import museumApi from '../services/api'
import cache from '../services/cache'

const bufferTime = 500

const addLocation = queue('Add Location')
addLocation.process(job)

async function job(job, done) {
  const { locationId } = job.data

  try {
    setTimeout(() => {
      museumApi.getLocation(locationId).then(({ ObjectIDs: objects = [] }) => {
        const objectIds = objects.map(id => ({
          locationId,
          objectId: id
        }))

        cache.set(locationId, objects.join())

        artworkJob.addArtwork(objectIds)

        done()
      })
    }, bufferTime)
  } catch (error) {
    console.error(error)
    done()
  }
}

export default {
  addLocation: data => addLocation.add(data)
}
