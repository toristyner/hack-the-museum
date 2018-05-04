const genreColor = [
  '#833AB4',
  '#B73CC0',
  '#CC3EA7',
  '#D8407E',
  '#DE2443',
  '#E92236',
  '#FD1D1D',
  '#FD4227',
  '#FD5A2E',
  '#FC7334',
  '#FC8B3B',
  '#F99F1F',
  '#DC844B',
  '#C56E61',
  '#B56B86'
]

export default {
  get: () => genreColor[Math.floor(Math.random() * genreColor.length - 1 + 1)]
}
