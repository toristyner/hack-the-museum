import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withLoader, GalleryTile } from '../components/'
import { GalleryLocationService } from '../utils'
import { styles } from '../styles'
import * as actions from '../actionTypes'

class Home extends Component {
  static propTypes = {
    currentGallery: PropTypes.string,
    data: PropTypes.object,
    handleGalleryLocationChange: PropTypes.func.isRequired,
    selectArt: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      galleryData: {
        Gallery: '',
      },
    }
  }

  componentWillMount = () => {
    GalleryLocationService.listenToGalleryLocationChange(this.props.handleGalleryLocationChange)
  }

  componentWillReceiveProps = (nextProps) => {
    const { data, currentGallery } = nextProps
    if (currentGallery && data && data[currentGallery]) {
      this.setState({ galleryData: data[currentGallery] })
    }
  }

  goToArtDetail = (id) => {
    this.props.selectArt(id)
    this.props.history.push('detail')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{`${
          this.state.galleryData.Gallery && this.state.galleryData.Gallery.length
            ? this.state.galleryData.Gallery
            : 'No Gallery Found'
        }`}
        </Text>
        <FlatList
          contentContainerStyle={myStyles.list}
          data={this.state.galleryData.Objects}
          keyExtractor={item => `art${item.ObjectID}`}
          renderItem={({ item }) => (
            <GalleryTile
              onPress={() => this.goToArtDetail(item.ObjectID)}
              photoUrl={item.Thumbnail}
            />
          )}
        />
      </View>
    )
  }
}

export const mapStateToProps = ({ galleryInfo }) => ({
  currentGallery: galleryInfo.currentGalleryId,
  data: galleryInfo.data,
  galleriesVisited: galleryInfo.history,
  isLoading: galleryInfo.isLoading,
  loadingMessage: galleryInfo.loadingMessage,
})

export const mapDispatchToProps = dispatch => ({
  handleGalleryLocationChange: galleryId =>
    dispatch({
      type: actions.GALLERY_LOCATION_CHANGED,
      payload: {
        galleryId,
      },
    }),
  selectArt: id =>
    dispatch({
      type: actions.REQUEST_ART_DETAIL,
      payload: { id },
    }),
})

const myStyles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Home))
