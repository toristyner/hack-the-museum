import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, View, Image, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import isNil from 'lodash/isNil'
import { withLoader, GalleryTile } from '../components/'
import { GalleryLocationService } from '../utils'
import {
  styles,
  numOfGalleryTilesPerRow,
  headerPadding,
  bloodOrange,
  transparentDark,
  transparentLight,
} from '../styles'
import * as actions from '../actionTypes'
import pamImage from '../assets/pam.jpg'

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

  profileMatchOverlay = item => (
    item.matchesProfile && (
      <Icon
        color={bloodOrange}
        name="md-star"
        size={20}
        style={myStyles.profileMatchOverlay}
      />
    )
  )

  locationOverlay = item => (
    <View style={myStyles.locationOverlay}>
      <Text style={myStyles.location}>
        {item.Location.GalleryShort}
      </Text>
    </View>
  )

  renderGalleryTile = ({ item }) => (
    <GalleryTile
      onPress={() => this.goToArtDetail(item.ObjectID)}
      photoUrl={item.Thumbnail}
      renderOverlay={() => (
        isNil(item.matchesProfile) ?
          this.locationOverlay(item) :
          this.profileMatchOverlay(item)
      )}
    />
  )

  render() {
    return (
      <View style={{ position: 'relative' }}>
        <FlatList
          ListHeaderComponent={
            // this goes in here because otherwise the bottom nav gets pushed down
            <View style={myStyles.imageContainer}>
              <Image
                source={pamImage}
                style={myStyles.headerImage}
              />
              <View style={myStyles.headerTitle}>
                <Text style={styles.boldWhite}>
                  {this.props.data.name && this.props.data.name.length
                    ? this.props.data.name
                    : 'No Gallery Found'}
                </Text>
              </View>
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

const headerHeight = (height / 5)
const myStyles = {
  imageContainer: {
    position: 'relative',
    height: height / 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    marginRight: -10,
  },
  headerImage: {
    width,
    height: headerHeight,
    position: 'absolute',
  },
  headerTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
    paddingTop: headerHeight / 3.5,
    width: '100%',
    height: '100%',
    backgroundColor: transparentLight,
  },
  profileMatchOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 3,
  },
  locationOverlay: {
    position: 'absolute',
    bottom: 0,
    padding: 5,
    width: '100%',
    backgroundColor: transparentDark,
  },
  location: {
    color: 'white',
    fontSize: 13,
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
