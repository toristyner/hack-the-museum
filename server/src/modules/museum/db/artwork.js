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
      const genreIncrements = this.incrementGenres(genres)

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

  async likeSong({ id, songId, genres }) {
    return new Promise(resolve => {
      const songIncrement = { 'songs.$.popularity': 1 }
      const increments = this.incrementGenres(genres, songIncrement)

      this.artwork.findOneAndUpdate(
        { id, 'songs.id': songId },
        {
          $inc: increments
        },
        { upsert: true, new: true },
        (err, data) => {
          resolve(data)
        }
      )
    })
  }

  incrementGenres(genres, initial = {}) {
    return genres.reduce(
      (incs, genre) => ({
        ...incs,
        [`genres.${genre.name}`]: 1
      }),
      initial
    )
  }
}

export default new ArtworkModel()
