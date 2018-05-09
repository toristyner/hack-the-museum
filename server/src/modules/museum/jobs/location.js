import queue from '../../../shared/queue'
import artworkJobs from './artwork'
import museumApi from '../services/api'
import cache from '../services/cache'

const config = {
  addDelay: 2000,
  updateDelay: 1000
}

const queues = {
  add: 'Add Location',
  update: 'Update Location'
}

const addLocation = queue(queues.add)
const updateLocation = queue(queues.update)

updateLocation.empty()
addLocation.empty()

addLocation.process(addLocationJob)
updateLocation.process(updateLocationJob)

addLocation.on('drained', () => console.log(`${queues.add}: Complete`))
updateLocation.on('drained', () => console.log(`${queues.update}: Complete`))

async function addLocationJob(job, done) {
  const { locationId } = job.data

  try {
    const { ObjectIDs: objects = [] } = await museumApi.getLocation(locationId)

    const objectIds = objects.map(id => ({
      locationId,
      objectId: id
    }))

    if (!objects.length) {
      console.log(`${locationId}: No Objects Found`)
      return done()
    }

    cache.set(locationId, objects.join())
    artworkJobs.addArtwork(objectIds)

    setTimeout(() => done(), config.addDelay)
  } catch (error) {
    console.error(`Add Location Error: ${locationId}`)
    done()
  }
}

async function updateLocationJob(job, done) {
  const { locationId } = job.data

  try {
    const artwork = await cache.get(locationId)

    if (!artwork) {
      console.log('No Location Found:', locationId)
      addLocation.add({ locationId })
      return done()
    }

    const artworkIds = artwork.split(',')
    artworkJobs.updateArtwork({ locationId, artworkIds })

    return setTimeout(() => done(), config.updateDelay)
  } catch (error) {
    console.error(error)
    done()
  }
}

export default {
  addLocation: data => addLocation.add(data),
  updateLocation: data => updateLocation.add(data)
}
