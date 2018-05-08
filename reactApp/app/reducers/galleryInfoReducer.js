import * as actions from '../actionTypes'

const maxLocationHistory = 4
const initialState = {
  currentGalleryId: 'N/A',
  nearestGalleryId: null,
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
  case actions.UPDATE_LOCATIONS: {
    const { galleryId } = action.payload || {}
    const history = state.history.slice()

    // don't add id if it is same as nearest gallery
    if (galleryId !== state.nearestGalleryId) {
      history.push(galleryId)

      // remove oldest when max history is reached
      if (history.length - 1 > maxLocationHistory) {
        history.shift()
      }
    }

    return {
      ...state,
      nearestGalleryId: galleryId,
      history,
    }
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
