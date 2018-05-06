import * as actions from '../actionTypes'

const initialState = {
  currentGalleryId: 'N/A',
  data: {},
  detail: {
    Title: '',
    Artist: '',
    photoUrl: '',
    Dated: '',
    Style: '',
    music: {
      genres: [],
      songs: [],
    },
  },
  history: [],
  isLoading: true,
  loadingMessage: 'Launching HTM',
}

export default function galleryInfo(state = initialState, action) {
  switch (action.type) {
  case actions.REQUEST_ART_DETAIL: {
    return {
      ...state,
      // detail: {
      //   ...initialState.detail,
      // },
      isLoading: true,
    }
  }
  case actions.RECEIVE_ART_LIST: {
    return {
      ...state,
      data: {
        ...action.payload,
      },
      isLoading: false,
    }
  }
  case actions.RECEIVE_ART_DETAIL: {
    return {
      ...state,
      detail: {
        id: action.payload.id,
        photoUrl: action.payload.data.Image,
        ...action.payload.data,
      },
      isLoading: false,
    }
  }
  case actions.RECEIVE_ART_MUSIC: {
    return {
      ...state,
      detail: {
        ...state.detail,
        music: action.payload.music,
      },
      isLoading: false,
    }
  }
  case actions.LIKE_SONG: {
    const newSongs = state.detail.music.songs.map((s) => {
      const song = { ...s }
      if (song.id === action.payload.song.id) {
        song.isLiked = true
      }
      return song
    })
    return {
      ...state,
      detail: {
        ...state.detail,
        music: {
          ...state.detail.music,
          songs: newSongs,
        },
      },
    }
  }
  case actions.GALLERY_LOCATION_CHANGED: {
    if (state.history[state.history.length - 1] === action.payload.galleryId) {
      return state
    }

    let newHistory
    if (state.history.length > 4) {
      newHistory = [...state.history.slice(1, 4), action.payload.galleryId]
    } else {
      newHistory = [...state.history, action.payload.galleryId]
    }

    return {
      ...state,
      history: newHistory,
    }
  }
  case actions.UPDATE_ART_LIST:
    return {
      ...state,
      currentGalleryId: action.payload.galleryId.toString(),
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
