import express from 'express'
import locationJobs from '../jobs/location'
import museumApi from '../services/api'

const router = express.Router()

const LOC_REGEX = /(^\d{2})$|(^\d{3}\w)$|(^\d{3})$/
const ingnoreGalleries = ['50']
const galleries = [
  '111',
  '116',
  '155',
  '161',
  '201',
  '204',
  '226',
  '244',
  '265'
]

const jobs = {
  seed: 'addLocation',
  validate: 'updateLocation'
}

router.get('/jobs/cache/:type', startCacheJob)

async function startCacheJob(req, res) {
  const { type } = req.params
  const { all } = req.query

  const allLocations = all === 'true'
  const job = jobs[type]

  if (!locationJobs[job]) {
    return res.status(404).send('Job type not found')
  }

  try {
    const locations = await museumApi.getAllLocations()

    if (locations) {
      getValidLocations(locations, allLocations).forEach(
        loc => loc.Name && locationJobs[job]({ locationId: loc.Name })
      )
    }

    return res.status(200).send(`${type} started`)
  } catch (error) {
    return res.status(404).json(error)
  }
}

function getValidLocations(locations, allLocations = false) {
  const validLocations = locations.filter(
    loc => LOC_REGEX.test(loc.Name) && !ingnoreGalleries.includes(loc.Name)
  )

  return allLocations
    ? validLocations
    : validLocations.filter(loc => galleries.includes(loc.Name))
}

export default router
