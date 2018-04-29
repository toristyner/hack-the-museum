import express from 'express'
import cache from '../services/cache'

const router = express.Router()

router.get('/locations/:id', loctionDetail)
router.get('/locations/:id/artwork/:artworkId', loctionArtworkDetail)

async function loctionDetail(req, res) {
  const { id } = req.params

  try {
    const locationItems = await cache.hmget(id)

    if (!locationItems) {
      return res.status(404).send()
    }

    const objects = Object.values(locationItems)
    const { Gallery, GalleryShort } = objects[0].Location

    const data = {
      Gallery,
      GalleryShort,
      Objects: objects.map(obj => ({
        ...obj,
        Location: null
      }))
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error)
  }
}

async function loctionArtworkDetail(req, res) {
  const { id, artworkId } = req.params

  try {
    const data = await cache.hmget(id, artworkId)

    if (!data) {
      return res.status(404).send()
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default router
