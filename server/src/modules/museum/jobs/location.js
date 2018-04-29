import queue from '../../../shared/queue'
import artworkJob from './artwork'
import museumApi from '../services/api'

const bufferTime = 500

const addLocation = queue('Add Location')
addLocation.process(job)

async function job(job, done) {
  const { locationId } = job.data

  try {
    setTimeout(() => {
      museumApi.getLocation(locationId).then(({ ObjectIDs: objects = [] }) => {
        const ids = objects.map(id => ({
          locationId,
          objectId: id
        }))

        artworkJob.addArtwork(ids)

        done(null)
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
