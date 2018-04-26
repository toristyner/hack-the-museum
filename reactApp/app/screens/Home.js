import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withLoader, GalleryTile } from '../components/'
import { GalleryLocationService } from '../utils'
import { Image, FlatList, Text, View, ScrollView, StyleSheet } from 'react-native'
import { styles } from '../styles'
import * as actions from '../actionTypes'

class Home extends Component {
  static propTypes = {}

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

  goToArtDetail = (item) => {
    this.props.selectArt(item)
    this.props.history.push('detail')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{`${
          this.state.galleryData.Gallery.length
            ? this.state.galleryData.Gallery
            : 'No Gallery Found'
        }`}
        </Text>
        <FlatList
          contentContainerStyle={myStyles.list}
          data={this.state.galleryData.Objects}
          keyExtractor={(item, index) => `art${item.ObjectID}`}
          renderItem={({ item }) => (
            <GalleryTile
              onPress={() => this.goToArtDetail(item)}
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
  selectArt: art =>
    dispatch({
      type: actions.LOAD_ART_DETAIL,
      payload: {
        ...art,
      },
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
