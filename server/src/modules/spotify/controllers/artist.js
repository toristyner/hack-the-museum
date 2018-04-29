import express from 'express'
import artistService from '../services/artist'

const router = express.Router()

router.get('/artist/:id', artistDetail)

async function artistDetail(req, res) {
  const { id } = req.params

  try {
    const artist = await artistService.detail(id)

    return res.status(200).json(artist)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default router
