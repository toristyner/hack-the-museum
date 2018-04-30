import { all } from 'redux-saga/effects'
import GalleryInfo from './galleryInfoSaga'
import MusicProfile from './musicProfileSaga'

export default function* rootSaga() {
  yield all([GalleryInfo(), MusicProfile()])
}
