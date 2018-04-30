import express from 'express'
import cache from '../services/cache'
import artworkService from '../services/artwork'

const router = express.Router()

router.get('/artwork/:id', artworkDetail)
router.post('/artwork/:id/song', addSongToArtwork)
router.post('/artwork/:id/song/like', artworkLikeSong)
router.post('/artwork/recommendations/genres', getArtworkForGenres)

async function artworkDetail(req, res) {
  const { id } = req.params

  try {
    const artwork = await cache.getJson(id)
    const savedArtwork = await artworkService.getSavedById(id)

    if (!artwork) {
      return res.status(404).send()
    }

    return res.status(200).json({
      ...artwork,
      music: savedArtwork
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}

async function addSongToArtwork(req, res) {
  const song = req.body
  const { id } = req.params

  if (!song) {
    return res.status(400).send()
  }

  try {
    const artist = await artworkService.addSong(id, song)

    return res.status(200).json(artist)
  } catch (error) {
    return res.status(500).json(error)
  }
}

async function artworkLikeSong(req, res) {
  const song = req.body
  const { id } = req.params

  if (!song) {
    return res.status(400).send()
  }

  try {
    const artist = await artworkService.likeSong(id, song)

    return res.status(200).json(artist)
  } catch (error) {
    return res.status(500).json(error)
  }
}

async function getArtworkForGenres(req, res) {
  const { genres } = req.body

  if (!genres || !genres.length) {
    return res.status(400).send()
  }

  try {
    const artwork = await artworkService.getArtworkForGenres(genres)

    return res.status(200).json(artwork)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default router
