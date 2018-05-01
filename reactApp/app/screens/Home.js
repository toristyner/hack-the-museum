import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withLoader, GalleryTile } from '../components/'
import { GalleryLocationService, PhilaMuseumService } from '../utils'
import { styles, numOfGalleryTilesPerRow } from '../styles'
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

  static galleryItemKeyExtractor(item) {
    return `art${item.ObjectID}`
  }

  componentWillMount = () => {
    // GalleryLocationService.listenToGalleryLocationChange(this.props.handleGalleryLocationChange)

    // Just try it with a random gallery:
    this.props.handleGalleryLocationChange(111)
  }

  componentWillReceiveProps = (nextProps) => {
    const { data, currentGallery } = nextProps
    if (currentGallery && data && data[currentGallery]) {
      this.setState({ galleryData: data[currentGallery] })
    }
  }

  renderGalleryTile= ({ item })=> <GalleryTile
        onPress={() => this.goToArtDetail(item.ObjectID)}
        photoUrl={item.Thumbnail}
      />

  goToArtDetail = (id) => {
    this.props.selectArt(id)
    this.props.history.push('detail')
  }

  render() {
    return (
      <View style ={{
        paddingHorizontal: 10
      }}>
        <Text style={styles.title}>{`${
          this.state.galleryData.Gallery && this.state.galleryData.Gallery.length
            ? this.state.galleryData.Gallery
            : 'No Gallery Found'
        }`}
        </Text>
        <FlatList
          horizontal={false}
          numColumns={numOfGalleryTilesPerRow}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: 20
          }}
          data={this.state.galleryData.Objects}
          keyExtractor={Home.galleryItemKeyExtractor}
          renderItem={this.renderGalleryTile}
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

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Home))
