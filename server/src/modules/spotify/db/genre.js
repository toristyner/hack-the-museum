import { Genre } from '../../../db/models'
import genreFormatter from '../services/formatter'
import colorGenerator from '../../../shared/colors'

class GenreModel {
  constructor() {
    this.genre = Genre()
  }

  getTop() {
    return new Promise(resolve => {
      this.genre.find({}).then(genres => {
        resolve(genreFormatter.sortMap(genres))
      })
    })
  }

  addGenre(name, artworkId) {
    return new Promise(resolve => {
      this.genre.findOneAndUpdate(
        { name },
        {
          name,
          $setOnInsert: { color: colorGenerator.get() },
          $addToSet: { artworkIds: artworkId },
          $inc: { popularity: 1 }
        },
        { upsert: true, new: true },
        (err, data) => {
          resolve(data)
        }
      )
    })
  }

  updateGenrePopularity(name, artworkId, increment = 1) {
    return new Promise(resolve => {
      this.genre.findOneAndUpdate(
        { name },
        {
          name,
          $inc: { popularity: increment }
        },
        { upsert: true, new: true },
        (err, data) => {
          resolve(data)
        }
      )
    })
  }

  findGenres(genres) {
    return new Promise(resolve => {
      this.genre.find({ name: { $in: genres } }).then(genres => {
        resolve(genres)
      })
    })
  }

  findGenresByArtworkIds(ids) {
    return new Promise(resolve => {
      this.genre.find({ artworkIds: { $in: ids } }).then(genres => {
        resolve(genres)
      })
    })
  }
}

export default new GenreModel()
