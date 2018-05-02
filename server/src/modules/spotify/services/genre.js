import genreModel from '../db/genre'

class GenreService {
  async getByArtworkIds(artworkIds) {
    const genres = await genreModel.findGenresByArtworkIds(artworkIds)

    const artworkGenreMap = artworkIds.reduce((artMap, artId) => {
      return {
        ...artMap,
        [artId]: genres
          .filter(genre => genre.artworkIds.includes(artId.toString()))
          .map(genre => genre.name)
      }
    }, {})

    return artworkGenreMap
  }
}

export default new GenreService()
