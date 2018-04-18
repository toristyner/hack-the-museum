import React, { Component } from 'react'
import {
  NativeModules,
  View,
} from 'react-native'
import { GalleryLocationFinder } from './screens/'
// Exposed swift classes to react native
import { GalleryLocationService } from './utils'


class App extends Component {
  
  state = {
    galleryLocationsRetrieved: false,
    locationRangingEnabled: false,
  }

  componentDidMount = () => this.initNativeServices()

  initNativeServices = () => {
    // We need to know the users location
    GalleryLocationService.requestLocationPermissions()

    // Load the galleries into the native app store
    GalleryLocationService.loadGeoLocationData(res => {
      this.setState({ galleryLocationsRetrieved: res.didFetchLocations})
    })
  }

  render() {
    return (<View style={styles.container}>
      <GalleryLocationFinder
        locationRangingEnabled={this.state.locationRangingEnabled}
        galleryLocationsRetrieved={this.state.galleryLocationsRetrieved}
      />
    </View>)
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#b042f4',
    margin: 10,
  },
  disabled: {
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
}

export default App