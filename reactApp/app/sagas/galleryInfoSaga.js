import { call, takeLatest, put } from 'redux-saga/effects'
import { GalleryLocationService } from '../utils'
import * as actions from '../actionTypes'

export function* initGalleryServices() {
  // We need to know the users location
  GalleryLocationService.requestLocationPermissions()
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

  yield put({
    type: actions.UPDATE_CURRENT_GALLERY,
    payload: {
      galleryId,
    },
  })
}

function* galleryInfoSaga() {
  yield takeLatest(actions.INIT_GALLERY_SERVICES, initGalleryServices)
  yield takeLatest(actions.GALLERY_LOCATION_CHANGED, handleGalleryLocationChange)
}

export default galleryInfoSaga
