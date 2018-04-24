import { all } from 'redux-saga/effects'
import GalleryInfo from './galleryInfoSaga'

export default function* rootSaga() {
  yield all([
    GalleryInfo(),
  ])
}
