import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withLoader } from '../components/'
import { GalleryLocationService } from '../utils'
import {
  Text,
  View,
  ScrollView
} from 'react-native'
import { styles } from '../styles'
import * as actions from '../actionTypes'

class Home extends Component {

  static propTypes = {

  }

  componentWillMount = () => {
    GalleryLocationService.listenToGalleryLocationChange(this.props.handleGalleryLocationChange)
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>{`Current Gallery: ${this.props.currentGallery}`}</Text>
        </View>
        <View style={styles.container}>
          <Text>Galleries Travelled:</Text>
          <ScrollView>
          {
            this.props.galleriesVisited.map( (gallery, i) => <Text key={`g${i}`}>{gallery}</Text>)
          }
          </ScrollView>
        </View>
      </View>
    )

  }
}

export const mapStateToProps = ({galleryInfo}) => ({
  currentGallery: galleryInfo.currentGalleryId,
  galleriesVisited: galleryInfo.history,
  isLoading: galleryInfo.isLoading,
  loadingMessage: galleryInfo.loadingMessage,
})

export const mapDispatchToProps = dispatch => ({
  handleGalleryLocationChange: (galleryId) => dispatch({
    type: actions.GALLERY_LOCATION_CHANGED,
    payload: {
      galleryId
    }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Home))