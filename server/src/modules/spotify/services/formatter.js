import { mapProps, sortDesc } from '../../../shared/formatter'

const genreProps = ['name', 'color', 'popularity']

const sort = genres => {
  return genres.sort(sortDesc('popularity'))
}

const sortMap = (genres = []) => {
  return sort(mapProps(genres, genreProps))
}

const list = (genres = []) => {
  const genreNames = Object.keys(genres)
  const formattedGenres = genreNames.reduce(
    (genreList, name) => [
      ...genreList,
      {
        name,
        color,
        popularity: genres[name]
      }
    ],
    []
  )

  return sort(formattedGenres)
}

export default {
  list,
  sortMap,
  sort
}
