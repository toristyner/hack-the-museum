import express from 'express'
import artistsService from '../services/artists'

const router = express.Router()

router.get('/artists/:id', artistDetail)

async function artistDetail(req, res) {
  const { id } = req.params

  try {
    const data = await artistsService.detail(id)

    return res.status(200).json(data)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export default router
