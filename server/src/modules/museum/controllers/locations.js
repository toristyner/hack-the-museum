import express from 'express'
import cache from '../services/cache'
import artworkService from '../services/artwork'

const router = express.Router()

router.get('/locations/:id', loctionDetail)

async function loctionDetail(req, res) {
  const { id } = req.params

  try {
    const locationItems = await cache.get(id)

    if (!locationItems) {
      return res.status(404).send()
    }

    const objects = await artworkService.getByIds(locationItems.split(','))

    const { Gallery, GalleryShort } = objects[0].Location

    const data = {
      Gallery,
      GalleryShort,
      Objects: objects.map(artworkService.formatList)
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default router
