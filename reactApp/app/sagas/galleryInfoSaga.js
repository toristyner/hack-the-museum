import { call, select, takeLatest, put } from 'redux-saga/effects'
import { GalleryLocationService, PhilaMuseumService } from '../utils'
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
      type: actions.UPDATE_CURRENT_GALLERY,
      payload: {
        galleryId: 111,
      },
    })
  }
}

function* requestGalleryItems() {
  const galleryId = yield select(state => state.galleryInfo.currentGalleryId)
  const galleryData = yield select(state => state.galleryInfo.data)
  if (galleryData[galleryId] === undefined) {
    const response = yield call(PhilaMuseumService.getGalleryItems, galleryId)
    yield put({
      type: actions.RECEIVE_GALLERY_ART,
      payload: { ...response, id: galleryId } || [],
    })
  }

  yield put({ type: actions.STOP_LOADER })
}


function* galleryInfoSaga() {
  yield takeLatest(actions.INIT_GALLERY_SERVICES, initGalleryServices)
  yield takeLatest(actions.GALLERY_LOCATION_CHANGED, handleGalleryLocationChange)
  yield takeLatest(actions.UPDATE_CURRENT_GALLERY, requestGalleryItems)
}

export default galleryInfoSaga
