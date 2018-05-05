import { call, select, takeLatest, put } from 'redux-saga/effects'
import { GalleryLocationService, PhilaMuseumService } from '../utils'
import * as actions from '../actionTypes'

function* mergeProfileSongs(artId, songs) {
  const likedSongs = yield select(({ musicProfile }) => musicProfile.likedSongs)

  return songs.map((song) => {
    const { [song.id]: likedSong } = likedSongs[artId] || {}

    return {
      ...song,
      isLiked: !!likedSong,
      addedByUser: !!(likedSong && likedSong.addedByUser),
    }
  })
}

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

function* requestByGallery(galleryId) {
  const response = yield call(PhilaMuseumService.getArtList, galleryId)
  return {
    art: response.Objects,
    name: response.Gallery,
  }
}

function* requestRecommendations(genres) {
  const response = yield call(PhilaMuseumService.getRecommendations, genres)
  return {
    art: response,
    name: genres.length > 1 ? 'Recommendations for You' : `Recommendations for ${genres[0]}`,
  }
}

function* requestArtList({ payload }) {
  const { galleryId, genres } = payload
  if (!galleryId && !genres) {
    yield put({
      type: actions.API_ERROR,
      payload: 'provide a galleryId or genre array to request art list',
    })
  } else {
    try {
      const response = genres ? yield requestRecommendations(genres) : yield requestByGallery(galleryId)
      yield put({
        type: actions.RECEIVE_ART_LIST,
        payload: response || {},
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

    artDetail.music.songs = yield mergeProfileSongs(artId, artDetail.music.songs)

    yield put({
      type: actions.RECEIVE_ART_DETAIL,
      payload: {
        id: artId,
        data: artDetail,
      },
    })
  }
}

function* updateArtMusic({ payload }) {
  const { artId, music } = payload

  music.songs = yield mergeProfileSongs(artId, music.songs)

  yield put({
    type: actions.RECEIVE_ART_MUSIC,
    payload: { music },
  })
}

function* galleryInfoSaga() {
  yield takeLatest(actions.INIT_GALLERY_SERVICES, initGalleryServices)
  yield takeLatest(actions.GALLERY_LOCATION_CHANGED, handleGalleryLocationChange)
  yield takeLatest(actions.REQUEST_ART_LIST, requestArtList)
  yield takeLatest(actions.REQUEST_ART_DETAIL, requestArtDetail)
  yield takeLatest(actions.UPDATE_ART_MUSIC, updateArtMusic)
}

export default galleryInfoSaga
