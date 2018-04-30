import { Artwork } from '../../../db/models'

class ArtworkModel {
  constructor() {
    this.artwork = Artwork()
  }

  findById(id) {
    return new Promise(resolve => {
      this.artwork.findOne({ id }).then(data => {
        const { songs = [], genres = {}, id } = data || {}
        resolve({ songs, genres, id })
      })
    })
  }

  async add({ id, song, genres }) {
    return new Promise(resolve => {
      const genreIncrements = genres.reduce(
        (incs, genre) => ({
          ...incs,
          ['genres.' + genre.name]: 1
        }),
        {}
      )

      this.artwork.findOneAndUpdate(
        { id },
        {
          id,
          $addToSet: {
            songs: song
          },
          $inc: genreIncrements
        },
        { upsert: true, new: true },
        (err, data) => {
          resolve(data)
        }
      )
    })
  }
}

export default new ArtworkModel()
