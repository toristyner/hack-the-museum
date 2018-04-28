import express from 'express'
import locationJob from '../jobs/location'
import museumApi from '../services/api'

const LOC_REGEX = /(^\d{3}\w)$|(^\d{3})$/
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

const router = express.Router()

router.get('/jobs/seed-cache', seedCache)

async function seedCache(req, res) {
  try {
    const locations = await museumApi.getAllLocations()

    if (locations) {
      locations
        .filter(loc => galleries.indexOf(loc.Name) > -1) // remove for all galleries
        .filter(loc => LOC_REGEX.test(loc.Name))
        .forEach(
          loc => loc.Name && locationJob.addLocation({ locationId: loc.Name })
        )
    }

    return res.status(200).send('Seeding Started')
  } catch (error) {
    return res.status(404).json(error)
  }
}

export default router
