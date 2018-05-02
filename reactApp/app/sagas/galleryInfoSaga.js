import { call, select, takeLatest, put } from 'redux-saga/effects'
import { GalleryLocationService, PhilaMuseumService } from '../utils'
import { getGenreColor } from '../utils/ColorPicker'
import * as actions from '../actionTypes'

export function* initGalleryServices() {
  // We need to know the users location
  GalleryLocationService.requestLocationPermissions()
  // Load geolocation data into the native app
  const didLoadGeolocationData = yield call(GalleryLocationService.loadGeoLocationData)
  if (didLoadGeolocationData) {
    GalleryLocationService.startLocationRanging()
  }
  yield put({
    type: actions.GEOLOCATION_DATA_DID_LOAD,
    payload: didLoadGeolocationData,
  })
}

export function* handleGalleryLocationChange({ payload }) {
  const { galleryId } = payload

  // TODO:
  // decide whether to actually update the current gallery
  // maybe this is a valid change and we need to do the work
  // maybe this is a glitch and we dont want to update rn

  // assume for now its valid change
  const isValidGalleryUpdate = true
  if (isValidGalleryUpdate) {
    yield put({
      type: actions.REQUEST_ART_LIST,
      payload: {
        galleryId,
      },
    })
  }
}

function* requestArtList({ payload }) {
  const { galleryId } = payload
  const galleryData = yield select(state => state.galleryInfo.data)
  if (galleryId !== 'N/A' && (!galleryData[galleryId] || !galleryData[galleryId].Objects)) {
    try {
      const response = yield call(PhilaMuseumService.getArtList, galleryId)
      yield put({
        type: actions.RECEIVE_ART_LIST,
        payload: { ...response, id: galleryId } || [],
      })
    } catch (err) {
      yield put({
        type: actions.API_ERROR,
        payload: err,
      })
    }
  }

  yield put({ type: actions.STOP_LOADER })
}


function* requestArtDetail({ payload }) {
  const { artId } = payload
  const galleryId = yield select(state => state.galleryInfo.currentGalleryId)
  if (galleryId && artId) {
    const artDetail = yield call(PhilaMuseumService.getArtDetail, galleryId, artId)
    const likedSongs = yield select(state => state.musicProfile.likedSongs)
    // is song liked
    artDetail.music.songs.forEach((song) => {
      song.isLiked = likedSongs[song.id] !== undefined
    })

    artDetail.music.genres.forEach((genre) => {
      genre.color = getGenreColor()
    })

    yield put({
      type: actions.RECEIVE_ART_DETAIL,
      payload: {
        id: artId,
        data: artDetail,
      },
    })
  }
}

function* galleryInfoSaga() {
  yield takeLatest(actions.INIT_GALLERY_SERVICES, initGalleryServices)
  yield takeLatest(actions.GALLERY_LOCATION_CHANGED, handleGalleryLocationChange)
  yield takeLatest(actions.REQUEST_ART_LIST, requestArtList)
  yield takeLatest(actions.REQUEST_ART_DETAIL, requestArtDetail)
}

export default galleryInfoSaga
