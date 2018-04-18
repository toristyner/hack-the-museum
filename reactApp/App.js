/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeModules, NativeEventEmitter } from 'react-native';
var { GalleryLocationManager, BackendService } = NativeModules

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const galleryLocationsRetrieved = 'Gallery Locations have been retrieved'
const galleryLocationsLoading = 'Gallery Locations loading'
const locationRangingEnabled = 'Location ranging is enabled'
const locationRangingStart = 'Start Location Ranging in Swift'


type Props = {};
var testEventName = 'test';
export default class App extends Component<Props> {
  
  state = {
    galleryLocationsRetrieved: false,
    locationRangingEnabled: false,
  }

  componentDidMount = () => {

    GalleryLocationManager.requestPermissions()
    const myModuleEvt = new NativeEventEmitter(GalleryLocationManager)
    var subscription = myModuleEvt.addListener(
      'GalleryLocationChanged',
      (response) => {
        console.log("GalleryLocationChanged")
        console.log(JSON.stringify(response))
      }
    );
    BackendService.retrieveGeolocationData(res => {
      this.setState({ galleryLocationsRetrieved: true })
    })
  }

  startLocationRanging = () => {
    GalleryLocationManager.startLocationRanging()
    this.setState({locationRangingEnabled: true })
  }

  getBackendStatus = () => this.state.galleryLocationsRetrieved ? galleryLocationsRetrieved : galleryLocationsLoading
  getButtonText = () => this.state.locationRangingEnabled ? locationRangingEnabled : locationRangingStart

  render() {
    // CLLocationCoordinate2D(latitude: 40.759211000000001, longitude: -73.984638000000004)
    // CLLocationCoordinate2D(latitude: 40.759211000000001, longitude: -73.984638000000004)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableOpacity
          disabled={this.state.locationRangingEnabled}
          onPress={this.startLocationRanging}
          style={this.state.locationRangingEnabled ? { ...styles.button,  ...styles.disabled } : { ...styles.button }}
        >
          <Text style={styles.text}>{this.getButtonText()}</Text>
        </TouchableOpacity>
        <Text>{this.getBackendStatus()}</Text>
      </View>
    );
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
    margin: 10
  },
  disabled: {
    backgroundColor: 'grey'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
};
