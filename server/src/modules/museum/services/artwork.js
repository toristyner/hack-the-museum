import artistService from '../../spotify/services/artist'
import genreModel from '../../spotify/db/genre'
import artworkModel from '../db/artwork'
import cache from '../services/cache'
import genreService from '../../spotify/services/genre'

const popularitySort = (a, b) => b.popularity - a.popularity

class ArtworkService {
  getSavedById(id) {
    return new Promise(async resolve => {
      const artwork = await artworkModel.findById(id)

      artwork.genres = genreService.formatToList(artwork.genres)

      artwork.songs = artwork.songs.sort(popularitySort)

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

    artwork.genres = genreService.formatToList(artwork.genres)
    artwork.songs = artwork.songs.sort(popularitySort)

    return artwork
  }

  async likeSong(artworkId, data) {
    const { id, artist } = data

    const artistDetail = await artistService.detail(artist.id)
    const genres = await Promise.all(
      artistDetail.genres.map(genre => genreModel.addGenre(genre, artworkId))
    )

    const artwork = await artworkModel.likeSong({
      id: artworkId,
      songId: id,
      genres
    })

    artwork.genres = genreService.formatToList(artwork.genres)
    artwork.songs = artwork.songs.sort(popularitySort)

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
