import { call, select, takeLatest, put } from 'redux-saga/effects'
import { PhilaMuseumService } from '../utils'
import * as actions from '../actionTypes'

function* requestPopularGenres() {
  const response = yield call(PhilaMuseumService.getPopularGenres)
  yield put({
    type: actions.RECEIVE_POPULAR_GENRES,
    payload: {
      data: response,
    },
  })
}

function* likeSong({ payload }) {
  const { song } = payload

  // update global genre popularities
  const artId = yield select(state => state.galleryInfo.detail.id)
  const response = yield call(PhilaMuseumService.likeSong, artId, song)
  if (response) {
    // update user profile
    yield put({
      type: actions.UPDATE_USER_PROFILE,
      payload: {
        song,
        genre: '',
      },
    })
  }
}

function* musicProfileSaga() {
  yield takeLatest(actions.REQUEST_POPULAR_GENRES, requestPopularGenres)
  yield takeLatest(actions.LIKE_SONG, likeSong)
}

export default musicProfileSaga
