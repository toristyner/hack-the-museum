class GenreService {
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
