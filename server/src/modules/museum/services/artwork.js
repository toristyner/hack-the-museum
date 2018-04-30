import artistService from '../../spotify/services/artist'
import genreModel from '../../spotify/db/genre'
import artworkModel from '../db/artwork'
import cache from '../services/cache'

class ArtworkService {
  getSavedById(id) {
    return new Promise(async resolve => {
      const artwork = await artworkModel.findById(id)
      const genreNames = Object.keys(artwork.genres)

      if (genreNames.length) {
        artwork.genres = genreNames
          .reduce(
            (genreList, name) => [
              ...genreList,
              {
                name,
                popularity: artwork.genres[name]
              }
            ],
            []
          )
          .sort((a, b) => b.popularity - a.popularity)
      }

      resolve(artwork)
    })
  }

  async getByIds(ids) {
    const artwork = ids.map(id => cache.getJson(id))

    return await Promise.all(artwork)
  }

  async addSong(artworkId, data) {
    const { id, uri, name, images, artist } = data

    const artistDetail = await artistService.detail(artist.id)
    const genres = await Promise.all(
      artistDetail.genres.map(genre => genreModel.addGenre(genre, artworkId))
    )

    const artwork = await artworkModel.add({
      id: artworkId,
      song: {
        name,
        id,
        uri,
        artist: artistDetail,
        images
      },
      genres
    })

    return artwork
  }

  async getArtworkForGenres(genreNames) {
    const genres = await genreModel.findGenres(genreNames)
    const ids = genres.reduce(
      (uniqueIds, { artworkIds }) => [
        ...uniqueIds,
        ...artworkIds.filter(id => !uniqueIds.includes(id))
      ],
      []
    )

    const artworks = await this.getByIds(ids)
    return artworks.map(artwork => this.formatList(artwork))
  }

  formatList(artwork) {
    const props = ['ObjectID', 'Title', 'Artist', 'Thumbnail']

    return props.reduce(
      (obj, prop) => ({
        ...obj,
        [prop]: artwork[prop]
      }),
      {}
    )
  }
}

export default new ArtworkService()
