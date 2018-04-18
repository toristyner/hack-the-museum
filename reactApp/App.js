import React, { Component } from 'react'
import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// Exposed swift classes to react native
const { GalleryLocationManager, BackendService } = NativeModules

const galleryLocationsRetrieved = 'Gallery Locations have been retrieved'
const galleryLocationsLoading = 'Gallery Locations loading'
const locationRangingEnabled = 'Location ranging is enabled'
const locationRangingStart = 'Start Location Ranging in Swift'

type Props = {}
var testEventName = 'test'
export default class App extends Component<Props> {
  state = {
    galleryLocationsRetrieved: false,
    galleriesVisited: [],
    locationRangingEnabled: false,
  }

  componentDidMount = () => {
    // We need to know the users location
    GalleryLocationManager.requestPermissions()

    // Native swift will emit an event when a new gallery has been identified based on
    // the users location, subscribe to this event
    const galleryChangeEvent = new NativeEventEmitter(GalleryLocationManager)
    const galleryChangeSubscription = galleryChangeEvent.addListener(
      'GalleryLocationChanged',
      this.handleGalleryLocationChange
    )

    // Native swift is keeping a store of all gallery locations to compare the users location to
    BackendService.retrieveGeolocationData(res => {
      this.setState({ galleryLocationsRetrieved: true })
    })
  }

  // Tell the native swift to start tracking changes in the users location
  startLocationRanging = () => {
    GalleryLocationManager.startLocationRanging()
    this.setState({ locationRangingEnabled: true })
  }

  // Handle the change event emitted by swift
  handleGalleryLocationChange = galleryName => {
    const galleriesVisited = [...this.state.galleriesVisited]
    galleriesVisited.push(galleryName)
    this.setState({ galleriesVisited })
  }

  getBackendStatus = () =>
    this.state.galleryLocationsRetrieved ? galleryLocationsRetrieved : galleryLocationsLoading

  getButtonText = () =>
    this.state.locationRangingEnabled ? locationRangingEnabled : locationRangingStart

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <TouchableOpacity
          disabled={this.state.locationRangingEnabled}
          onPress={this.startLocationRanging}
          style={
            this.state.locationRangingEnabled
              ? { ...styles.button, ...styles.disabled }
              : { ...styles.button }
          }
        >
          <Text style={styles.text}>{this.getButtonText()}</Text>
        </TouchableOpacity>
        <Text>{this.getBackendStatus()}</Text>
        <Text>Galleries Visited:</Text>
        {this.state.galleriesVisited.map(gallery => <Text key={gallery}>{gallery}</Text>)}
      </View>
    )
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
