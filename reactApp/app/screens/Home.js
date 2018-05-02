import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { withLoader, GalleryTile, GalleryBottomNav } from '../components/'
import { GalleryLocationService } from '../utils'
import { styles, numOfGalleryTilesPerRow, galleryBottomNavHeight } from '../styles'
import * as actions from '../actionTypes'

class Home extends Component {
  static propTypes = {
    currentGallery: PropTypes.string.isRequired,
    // data: PropTypes.objectOf(PropTypes.string).isRequired,
    handleGalleryLocationChange: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    selectArt: PropTypes.func.isRequired,
  }

  static galleryItemKeyExtractor(item) {
    return `art${item.ObjectID}`
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

  goToArtDetail = (id) => {
    this.props.selectArt(id)
    this.props.history.push('detail')
  }

  renderGalleryTile = ({ item }) => (<GalleryTile
    onPress={() => this.goToArtDetail(item.ObjectID)}
    photoUrl={item.Thumbnail}
  />)

  render() {
    return (
      <View style={{ position: 'relative' }}>
        <FlatList
          ListHeaderComponent={
            // this goes in here because otherwise the bottom nav gets pushed down
            <View>
              <Text style={styles.title}>{`${
                this.state.galleryData.Gallery && this.state.galleryData.Gallery.length
                  ? this.state.galleryData.Gallery
                  : 'No Gallery Found'
              }`}
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: galleryBottomNavHeight + 20,
            // also adding some extra padding for the header at the top
          }}
          horizontal={false}
          numColumns={numOfGalleryTilesPerRow}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: 20,
          }}
          data={this.state.galleryData.Objects}
          keyExtractor={Home.galleryItemKeyExtractor}
          renderItem={this.renderGalleryTile}
        />
        <GalleryBottomNav />
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
  selectArt: artId =>
    dispatch({
      type: actions.REQUEST_ART_DETAIL,
      payload: { artId },
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Home))
