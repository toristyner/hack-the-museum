import * as actions from '../actionTypes'

export default function galleryInfo(state = [], action) {
  switch (action.type) {
  case actions.SET_GALLERY_LOCATIONS_RETRIEVED:
    return {
      ...state,
      galleryLocationsRetrieved: action.payload,
    }
  default:
    return state
  }
}

