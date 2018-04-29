import { Genre } from '../../../db/models'

class GenreModel {
  constructor() {
    this.genre = Genre()
  }

  getTop() {
    return new Promise(resolve => {
      this.genre.find({}).then(genres => {
        // TODO: make popularity dynamic
        resolve(genres.map(({ name }) => ({ name, popularity: 1 })))
      })
    })
  }

  addGenre(name, artworkId) {
    return new Promise(resolve => {
      this.genre.findOneAndUpdate(
        { name },
        { name, $addToSet: { artworkIds: artworkId } },
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
