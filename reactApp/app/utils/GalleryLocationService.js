import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native'

// Exposed swift classes to react native
const { BackendService, GalleryLocationManager } = NativeModules

const GalleryLocationService = {

  // Request from app to know users location
  requestLocationPermissions: () => GalleryLocationManager.requestPermissions(),

  // Load the galleries into the native app store
  // Used for comparison with users location
  loadGeoLocationData: (handleGeolocationData) => {
    BackendService.retrieveGeolocationData(handleGeolocationData)
  },

  // Tell the native swift to start tracking changes in the users location
  startLocationRanging: () => GalleryLocationManager.startLocationRanging(),

  // Native swift will emit an event "GalleryLocationChanged" when a new gallery has been identified
  listenToGalleryLocationChange: (handleGalleryLocationChange) => {
    const galleryChangeEvent = new NativeEventEmitter(GalleryLocationManager)
    galleryChangeEvent.addListener('GalleryLocationChanged', handleGalleryLocationChange)
  },

}

export default GalleryLocationService

