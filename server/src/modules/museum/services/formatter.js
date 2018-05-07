import { reduceProps, mapProps, sortDesc } from '../../../shared/formatter'

const coreListItems = ['ObjectID', 'Title', 'Artist', 'Thumbnail']
const simpleList = [...coreListItems, 'Location']
const list = [...coreListItems, 'genres']
const detail = [
  'ObjectID',
  'Image',
  'Title',
  'Artist',
  'Style',
  'Dated',
  'music'
]

const mapGallery = gallery => ({
  Gallery: gallery.Gallery,
  GalleryShort: gallery.GalleryShort
})

const mapSimpleList = data =>
  data.map(d =>
    simpleList.reduce(
      (prev, prop) => ({
        ...prev,
        [prop]: prop === 'Location' ? mapGallery(d[prop]) : d[prop]
      }),
      {}
    )
  )

export default {
  list: data => mapProps(data, list),
  simpleList: mapSimpleList,
  detail: data => reduceProps(data, detail),
  sortSongs: songs => songs.sort(sortDesc('popularity'))
}
