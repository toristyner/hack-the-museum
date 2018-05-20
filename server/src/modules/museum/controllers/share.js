import express from 'express'
import artworkCache from '../services/cache'

const router = express.Router()

router.get('/share', shareArtwork)

async function shareArtwork(req, res) {
  const { songId, artworkId } = req.query

  const artwork = await artworkCache.getJson(artworkId) || {}

  return res.render('share', {
    songId,
    artwork
  })
}

export default router
