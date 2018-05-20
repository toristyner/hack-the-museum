import React, { Component } from 'react'
import { View, StyleSheet, Linking, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ArtImage, GenreSlider, SongList, SongSearch, Modal, SongModal } from '../components'
import MusicPlacholder from '../components/MusicPlacholder'
import { styles, galleryBottomNavHeight, headerPadding } from '../styles'
import * as actions from '../actionTypes'

const { height } = Dimensions.get('screen')
const imageComponentHeight = height / 3
const genreSliderHeight = 140

class Detail extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    addSong: PropTypes.func.isRequired,
    isSongSearchLoading: PropTypes.bool,
    songAction: PropTypes.func.isRequired,
    detail: PropTypes.object.isRequired,
    songSearch: PropTypes.func.isRequired,
    songResults: PropTypes.arrayOf(PropTypes.object).isRequired,
    getArtDetail: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    isSongSearchLoading: false,
    isLoading: false,
  }

  state = {
    showSearch: false,
    selectedSongId: null,
  }

  componentDidMount() {
    const { params = {} } = this.props.match

    if (params.artId) {
      this.props.getArtDetail(params.artId)
    }
  }

  toggleSearch = () => this.setState({ showSearch: !this.state.showSearch })

  selectSong = selectedSongId => this.setState({ selectedSongId })

  addSong = (song) => {
    this.toggleSearch()
    this.props.addSong(song)
  }

  playSong = uri => Linking
    .openURL(uri)
    .catch(err => console.log('Bitch doesnt have spotify or something', err))

  recommendBasedOnGenre = (genreName) => {
    this.props.history.push(`/genre/${genreName}`)
  }

  goToHome = () => {
    this.props.history.goBack()
  }

  renderMusic = music => (
    music.songs.length ?
      <React.Fragment>
        <View style={{ height: genreSliderHeight }}>
          <GenreSlider
            genres={music.genres}
            onPressGenre={this.recommendBasedOnGenre}
          />
        </View>
        <SongList
          height={
            (height - genreSliderHeight - imageComponentHeight -
              galleryBottomNavHeight - headerPadding)
          }
          songs={music.songs}
          addSong={this.toggleSearch}
          songAction={this.props.songAction}
          onSongMenu={this.selectSong}
          playSong={this.playSong}
        />
      </React.Fragment>
      : <MusicPlacholder addSong={this.toggleSearch} />
  )

  render() {
    const {
      id,
      Title,
      Artist,
      photoUrl,
      Dated,
      Style,
      music,
    } = this.props.detail

    return (
      <View style={myStyles.container}>
        <View style={{
          height: imageComponentHeight,
        }}
        >
          <ArtImage
            onBack={this.goToHome}
            photoUrl={photoUrl}
            title={Title}
            artist={Artist}
            imageHeight={imageComponentHeight}
            style={Style}
            year={Dated}
            onExpand={() => this.props.history.push('/imageViewer')}
          />
        </View>
        {this.props.isLoading ?
          <View style={myStyles.indicator}>
            <ActivityIndicator
              active
            />
          </View>
          : this.renderMusic(music)}
        {this.state.showSearch && (
          <SongSearch
            loading={this.props.isSongSearchLoading}
            cancelSearch={this.toggleSearch}
            addSong={this.addSong}
            search={this.props.songSearch}
            songs={this.props.songResults}
          />
        )}
        <Modal
          isVisible={!!this.state.selectedSongId}
        >
          {() => (
            <SongModal
              closeModal={() => this.selectSong(null)}
              songId={this.state.selectedSongId}
              artworkId={id}
            />
          )}
        </Modal>
      </View>
    )
  }
}

export const mapStateToProps = state => ({
  isSongSearchLoading: state.musicProfile.isSongSearchLoading,
  currentGalleryId: state.galleryInfo.currentGalleryId,
  detail: state.galleryInfo.detail,
  songResults: state.musicProfile.songResults,
  isLoading: state.galleryInfo.isLoading,
})

export const mapDispatchToProps = dispatch => ({
  addSong: song => dispatch({
    type: actions.ADD_SONG,
    payload: { song },
  }),
  songAction: (isLiked, song) => dispatch({
    type: isLiked ? actions.UNLIKE_SONG : actions.LIKE_SONG,
    payload: { song },
  }),
  songSearch: searchTerm => dispatch({
    type: actions.SEARCH_SONG,
    payload: {
      searchTerm,
    },
  }),
  requestArtList: galleryId => dispatch({
    type: actions.REQUEST_ART_LIST,
    payload: {
      galleryId,
    },
  }),
  getArtDetail: artId =>
    dispatch({
      type: actions.REQUEST_ART_DETAIL,
      payload: { artId },
    }),
})

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  title: {
    ...styles.title,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  indicator: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
