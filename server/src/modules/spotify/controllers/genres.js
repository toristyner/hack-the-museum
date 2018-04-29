import express from 'express'
import genreModel from '../db/genre'

const router = express.Router()

router.get('/genres', getGenres)

async function getGenres(req, res) {
  try {
    const genres = await genreModel.getTop()

    return res.status(200).json(genres)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export default router
