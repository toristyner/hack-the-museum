import { Genre } from '../../../db/models'
import genreFormatter from '../services/formatter'

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
