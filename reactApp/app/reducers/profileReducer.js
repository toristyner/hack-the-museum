import * as actions from '../actionTypes'

const initialState = {
  genres: [],
  popularGenres: [],
  songResults: [],
  likedSongs: {},
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
      popularGenres: action.payload.data,
    }
  }
  case actions.RECEIVE_SONG_RESULTS: {
    return {
      ...state,
      songResults: action.payload.data,
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
  case actions.USER_PROFILE_UPDATE_SONG: {
    const { artId, song } = action.payload
    const {
      [song.id]: selectedSong,
      ...likedSongs
    } = { ...state.likedSongs[artId] }

    return {
      ...state,
      likedSongs: {
        ...state.likedSongs,
        [artId]: {
          ...likedSongs,
          ...(!selectedSong ? { [song.id]: song } : {}),
        },
      },
    }
  }
  default:
    return state
  }
}
