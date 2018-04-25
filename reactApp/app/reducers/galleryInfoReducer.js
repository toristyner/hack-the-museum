import * as actions from '../actionTypes'

const initialState = {
  currentGalleryId: 'N/A',
  data: {},
  history: [],
  isLoading: true,
  loadingMessage: 'Launching HTM',
}

export default function galleryInfo(state = initialState, action) {
  switch (action.type) {
  case actions.LOAD_ART_DETAIL: {
    return {
      detail: {
        ...action.payload,
        photoUrl: action.payload.Image,
      },
    }
  }
  case actions.RECEIVE_GALLERY_ART: {
    return {
      ...state,
      data: {
        ...state.data,
        [state.currentGalleryId]: {
          ...action.payload,
        },
      },
      isLoading: false,
    }
  }
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
      isLoading: true,
      loadingMessage: `Loading data for Gallery ${action.payload.galleryId}`,
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
  case actions.STOP_LOADER: {
    return {
      ...state,
      isLoading: false,
    }
  }
  default:
    return state
  }
}

