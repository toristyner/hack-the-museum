import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, View, Image, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { withLoader, GalleryTile, GalleryBottomNav } from '../components/'
import { GalleryLocationService } from '../utils'
import { styles, numOfGalleryTilesPerRow, headerPadding } from '../styles'
import * as actions from '../actionTypes'

const { width, height } = Dimensions.get('window')

class Home extends Component {
  static propTypes = {
    // currentGallery: PropTypes.string.isRequired,
    // data: PropTypes.objectOf(PropTypes.string).isRequired,
    handleGalleryLocationChange: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    selectArt: PropTypes.func.isRequired,
  }

  static galleryItemKeyExtractor(item) {
    return `art${item.ObjectID}`
  }

  componentWillMount = () => {
    GalleryLocationService.listenToGalleryLocationChange(this.props.handleGalleryLocationChange)
    // this.props.handleGalleryLocationChange(111)
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
            <View style={myStyles.imageContainer}>
              <Image
                source={require('../assets/pam.jpg')}
                style={myStyles.headerImage}
              />
              <Text style={styles.boldWhite}>{`${
                this.props.data.name && this.props.data.name.length
                  ? this.props.data.name
                  : 'No Gallery Found'
              }`}
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: headerPadding, // adding some extra padding for the header at the top
          }}
          horizontal={false}
          numColumns={numOfGalleryTilesPerRow}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: 20,
          }}
          data={this.props.data.art}
          keyExtractor={Home.galleryItemKeyExtractor}
          renderItem={this.renderGalleryTile}
        />
      </View>
    )
  }
}

const myStyles = {
  imageContainer: {
    height: height / 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width,
    height: height / 5,
    position: 'absolute',
  },
}

export const mapStateToProps = ({ galleryInfo }) => ({
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
