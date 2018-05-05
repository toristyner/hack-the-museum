import { call, select, takeLatest, put } from 'redux-saga/effects'
import { PhilaMuseumService } from '../utils'
import * as actions from '../actionTypes'

function* completeProfile() {
  const { genres } = yield select(state => state.musicProfile)
  yield put({
    type: actions.REQUEST_ART_LIST,
    payload: { genres: Object.keys(genres) },
  })
}

function* requestPopularGenres() {
  const response = yield call(PhilaMuseumService.getPopularGenres)
  yield put({
    type: actions.RECEIVE_POPULAR_GENRES,
    payload: {
      data: response,
    },
  })
}

function* search({ payload }) {
  const { searchTerm } = payload
  const response = yield call(PhilaMuseumService.search, searchTerm)
  if (response) {
    yield put({
      type: actions.RECEIVE_SONG_RESULTS,
      payload: {
        data: response,
      },
    })
  }
}

function* updateSong({ type, payload }) {
  const { song } = payload

  // update global genre popularities
  const artId = yield select(state => state.galleryInfo.detail.id)
  const response = yield call(PhilaMuseumService.updateSong, { artId, song, type })

  if (response) {
    // update user profile
    yield put({
      type: actions.USER_PROFILE_UPDATE_SONG,
      payload: {
        artId,
        song,
      },
    })

    yield put({
      type: type === actions.LIKE_SONG ?
        actions.USER_PROFILE_LIKE_GENRES :
        actions.USER_PROFILE_UNLIKE_GENRES,
      payload: {
        genres: response.updatedGenres,
      },
    })

    yield put({
      type: actions.UPDATE_ART_MUSIC,
      payload: {
        artId,
        music: response.music,
      },
    })
  }
}

function* addSong({ payload }) {
  const { song } = payload

  // update global genre popularities
  const artId = yield select(state => state.galleryInfo.detail.id)
  const response = yield call(PhilaMuseumService.addSong, artId, song)

  if (response) {
    // update user profile
    yield put({
      type: actions.USER_PROFILE_UPDATE_SONG,
      payload: {
        artId,
        song: {
          ...song,
          addedByUser: true,
        },
      },
    })

    yield put({
      type: actions.USER_PROFILE_LIKE_GENRES,
      payload: {
        genres: response.updatedGenres,
      },
    })

    yield put({
      type: actions.UPDATE_ART_MUSIC,
      payload: {
        artId,
        music: response.music,
      },
    })
  }
}

function* musicProfileSaga() {
  yield takeLatest(actions.COMPLETE_MUSIC_PROFILE, completeProfile)
  yield takeLatest(actions.REQUEST_POPULAR_GENRES, requestPopularGenres)
  yield takeLatest([actions.LIKE_SONG, actions.UNLIKE_SONG], updateSong)
  yield takeLatest(actions.SEARCH_SONG, search)
  yield takeLatest(actions.ADD_SONG, addSong)
}

export default musicProfileSaga
