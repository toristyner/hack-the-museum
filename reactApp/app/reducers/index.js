// import { combineReducers } from 'redux'
import { AsyncStorage } from 'react-native'
import { persistCombineReducers } from 'redux-persist'
import galleryInfo from './galleryInfoReducer'

// Config for the state persistor
const persistorConfig = {
  key: 'root',
  blacklist: [],
  storage: AsyncStorage, // default
}

export default persistCombineReducers(persistorConfig, {
  galleryInfo,
})
