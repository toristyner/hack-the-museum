import express from 'express'
import searchService from '../services/search'

const router = express.Router()

router.get('/search', search)

async function search(req, res) {
  const { q } = req.query

  try {
    const data = await searchService.search(q)

    return res.status(200).json(data)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export default router
