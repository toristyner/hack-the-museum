import artistService from '../../spotify/services/artist'
import genreModel from '../../spotify/db/genre'
import artworkModel from '../db/artwork'
import cache from '../services/cache'
import genreService from '../../spotify/services/genre'
import genreFormatter from '../../spotify/services/formatter'
import artworkFormatter from './formatter'

class ArtworkService {
  constructor() {
    this.songActions = {
      like: this.likeSong,
      dislike: this.dislikeSong
    }
  }

  getSavedById(id) {
    return new Promise(async resolve => {
      const artwork = await artworkModel.findById(id)

      artwork.genres = genreFormatter.list(artwork.genres)
      artwork.songs = artworkFormatter.sortSongs(artwork.songs)

      resolve(artwork)
    })
  }

  async getByIds(ids) {
    const reqs = ids.map(id => cache.getJson(id))
    const artworks = await Promise.all(reqs)

    const artworkIds = artworks.map(art => art.ObjectID)
    const artworkGenreMap = await genreService.getByArtworkIds(artworkIds)

    return artworks.map(art => ({
      ...art,
      genres: artworkGenreMap[art.ObjectID]
    }))
  }

  async addSong(artworkId, data) {
    const { id, uri, url, name, images, artist } = data

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
        url,
        artist: artistDetail,
        images
      },
      genres
    })

    artwork.genres = genreFormatter.list(artwork.genres)
    artwork.songs = artworkFormatter.sortSongs(artwork.songs)

    return artwork
  }

  async likeSong(artworkId, data) {
    const { id, artist } = data

    const artistDetail = await artistService.detail(artist.id)
    const genres = await Promise.all(
      artistDetail.genres.map(genre => genreModel.addGenre(genre, artworkId))
    )

    const artwork = await artworkModel.updateSongPopularity({
      id: artworkId,
      songId: id,
      genres
    })

    artwork.genres = genreFormatter.list(artwork.genres)
    artwork.songs = artworkFormatter.sortSongs(artwork.songs)

    return { artwork, updatedGenres: artistDetail.genres }
  }

  async dislikeSong(artworkId, data) {
    const { id, artist } = data

    const artistDetail = await artistService.detail(artist.id)
    const genres = await Promise.all(
      artistDetail.genres.map(genre =>
        genreModel.updateGenrePopularity(genre, artworkId, -1)
      )
    )

    const artwork = await artworkModel.updateSongPopularity(
      {
        id: artworkId,
        songId: id,
        genres
      },
      -1
    )

    artwork.genres = genreFormatter.list(artwork.genres)
    artwork.songs = artworkFormatter.sortSongs(artwork.songs)

    return { artwork, updatedGenres: artistDetail.genres }
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

    return artworkFormatter.simpleList(artworks)
  }
}

export default new ArtworkService()
