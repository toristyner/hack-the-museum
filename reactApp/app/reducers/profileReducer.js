import * as actions from '../actionTypes'

const initialState = {
  genres: [],
  popularGenres: []
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
  case actions.TOGGLE_USER_PREFERRED_GENRE: {
    return {
      ...state,
    }
  }
  case actions.RECEIVE_POPULAR_GENRES: {
    return {
      ...state,
      popularGenres: action.payload.data 
    }
  }
  case actions.UPDATE_USER_PROFILE: {
    return {
      ...state,
      likedSongs: {
        ...state.likedSongs,
        [action.payload.song.id]: action.payload.song,
      },

    }
  }
  default:
    return state
  }
}
