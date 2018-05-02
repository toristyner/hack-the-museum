import { mapProps, sortDesc } from '../../../shared/formatter'

const genreProps = ['name', 'popularity']

const sort = genres => {
  return genres.sort(sortDesc('popularity'))
}

const sortMap = (genres = []) => {
  return sort(mapProps(genres, genreProps))
}

const formatToList = (genres = []) => {
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

  return sort(formattedGenres)
}

export default {
  list: formatToList,
  sortMap
}
