import genreModel from '../db/genre'

class GenreService {
  async mapToArtworkIds(artworkIds) {
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

  sort(genres) {
    return genres.sort((a, b) => b.popularity - a.popularity)
  }

  sortMap(genres = []) {
    return this.sort(genres).map(({ name, popularity }) => ({
      name,
      popularity
    }))
  }

  formatToList(genres = []) {
    const genreNames = Object.keys(genres)
    const formattedGenres = genreNames.reduce(
      (genreList, name) => [
        ...genreList,
        {
          name,
          popularity: genres[name]
        }
      ],
      []
    )

    return this.sort(formattedGenres)
  }
}

export default new GenreService()
