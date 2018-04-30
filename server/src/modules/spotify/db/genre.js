import { Genre } from '../../../db/models'

class GenreModel {
  constructor() {
    this.genre = Genre()
  }

  getTop() {
    return new Promise(resolve => {
      this.genre.find({}).then(data => {
        const genres = data
          .sort((a, b) => b.popularity - a.popularity)
          .map(({ name, popularity }) => ({ name, popularity }))

        resolve(genres)
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
}

export default new GenreModel()
