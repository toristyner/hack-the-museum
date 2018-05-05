import * as actions from '../actionTypes'

const initialState = {
  isSongSearchLoading: false,
  genres: {},
  popularGenres: [],
  songResults: [],
  likedSongs: {},
  profileComplete: false,
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
  case actions.TOGGLE_USER_PREFERRED_GENRE: {
    return {
      ...state,
    }
  }
  case actions.COMPLETE_MUSIC_PROFILE: {
    return {
      ...state,
      profileComplete: true,
    }
  }
  case actions.RECEIVE_POPULAR_GENRES: {
    return {
      ...state,
      popularGenres: action.payload.data,
    }
  }
  case actions.SEARCH_SONG: {
    return {
      ...state,
      isSongSearchLoading: true,
    }
  }
  case actions.RECEIVE_SONG_RESULTS: {
    return {
      ...state,
      isSongSearchLoading: false,
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
  case actions.USER_PROFILE_LIKE_GENRES:
  case actions.USER_PROFILE_UNLIKE_GENRES: {
    const { payload } = action
    const genres = { ...state.genres }
    const increment = action.type === actions.USER_PROFILE_LIKE_GENRES ? 1 : -1

    const updatedGenres = {
      ...genres,
      ...payload.genres.reduce((updated, genre) => ({
        ...updated,
        [genre]: genres[genre] ? genres[genre] + increment : 1,
      }), {}),
    }

    return {
      ...state,
      genres: {
        ...Object.keys(updatedGenres).reduce((updated, genre) => ({
          ...updated,
          ...(
            updatedGenres[genre] > 0 ? { [genre]: updatedGenres[genre] } : {}
          ),
        }), {}),
      },
    }
  }
  default:
    return state
  }
}
