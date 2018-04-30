import * as actions from '../actionTypes'

const initialState = {
  genres: [],
  genreOptions: []
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
  case actions.TOGGLE_USER_PREFERRED_GENRE: {
    return {
      ...state,
      genres: []
    }
  }
  case actions.RECEIVE_POPULAR_GENRES: {
    return {
      ...state,
      genreOptions: action.payload.data 
    }
  }
  default:
    return state
  }
}
