import { reduceProps, mapProps, sortDesc } from '../../../shared/formatter'

const simpleList = ['ObjectID', 'Title', 'Artist', 'Thumbnail']
const list = [...simpleList, 'genres']
const detail = [
  'ObjectID',
  'Image',
  'Title',
  'Artist',
  'Style',
  'Dated',
  'music'
]

export default {
  list: data => mapProps(data, list),
  simpleList: data => mapProps(data, simpleList),
  detail: data => reduceProps(data, detail),
  sortSongs: songs => songs.sort(sortDesc('popularity'))
}
