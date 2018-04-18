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
import { GalleryLocationService } from '../utils'
import { connect } from 'react-redux'
import * as actions from '../actionTypes'
import PropTypes from 'prop-types'


const galleryLocationsRetrieved = 'Gallery Locations have been retrieved'
const galleryLocationsLoading = 'Gallery Locations loading'
const locationRangingEnabled = 'Location ranging is enabled'
const locationRangingStart = 'Start Location Ranging in Swift'


class GalleryLocationFinder extends Component {
  
  static propTypes = {
    galleryLocationsRetrieved: PropTypes.bool,
    locationRangingEnabled: PropTypes.bool
  }

  state = {
    galleriesVisited: [],
  }

  componentDidMount = () => {
    GalleryLocationService.listenToGalleryLocationChange(this.handleGalleryLocationChange)
  }

  // Tell the native swift to start tracking changes in the users location
  startLocationRanging = () => {
    GalleryLocationService.startLocationRanging()
    this.setState({ locationRangingEnabled: true })
  }

  // Handle the change event emitted by swift
  handleGalleryLocationChange = galleryName => {
    const galleriesVisited = [...this.state.galleriesVisited]
    galleriesVisited.push(galleryName)
    this.setState({ galleriesVisited })
  }

  getBackendStatus = () =>
    this.props.galleryLocationsRetrieved ? galleryLocationsRetrieved : galleryLocationsLoading

  getButtonText = () =>
    this.props.locationRangingEnabled ? locationRangingEnabled : locationRangingStart

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

export const mapStateToProps = (state) => ({
  galleryLocationsRetrieved: state.galleryInfo.galleryLocationsRetrieved,
  locationRangingEnabled: state.galleryInfo.locationRangingEnabled
})

export const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryLocationFinder)