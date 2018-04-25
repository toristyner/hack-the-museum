import * as actions from '../actionTypes'

const initialState = {
  currentGalleryId: 'N/A',
  history: [],
  isLoading: true,
  loadingMessage: 'Launching HTM',
}

export default function galleryInfo(state = initialState, action) {
  switch (action.type) {
  case actions.GALLERY_LOCATION_CHANGED: {
    return {
      ...state,
      history: [action.payload.galleryId, ...state.history],
    }
  }
  case actions.UPDATE_CURRENT_GALLERY:
    return {
      ...state,
      currentGalleryId: action.payload.galleryId,
    }
  case actions.GEOLOCATION_DATA_DID_LOAD:
    return {
      ...state,
      galleryLocationsRetrieved: action.payload,
      isLoading: false,
      error: !action.payload,
      errorMessage: 'Geolocation Data did not load',
    }
  case actions.INIT_GALLERY_SERVICES: {
    return {
      ...state,
      loadingMessage: 'Loading GeoLocation Data',
    }
  }
  default:
    return state
  }
}

