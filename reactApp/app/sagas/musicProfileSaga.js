import { call, select, takeLatest, put } from 'redux-saga/effects'
import { GalleryLocationService, PhilaMuseumService } from '../utils'
import * as actions from '../actionTypes'

function* requestGenreOptions() {
  const response = yield call(PhilaMuseumService.getPopularGenres)
    yield put({
      type: actions.RECEIVE_POPULAR_GENRES,
      payload: {
        data: response,
      },
    })
}

function* galleryInfoSaga() {
  yield takeLatest(actions.REQUEST_POPULAR_GENRES, requestGenreOptions)
}

export default galleryInfoSaga
