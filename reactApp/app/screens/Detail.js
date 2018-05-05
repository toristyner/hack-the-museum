import React, { Component } from 'react'
import { View, StyleSheet, Linking, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ArtImage, GenreSlider, SongList, SongSearch, withLoader } from '../components/'
import { styles, galleryBottomNavHeight, headerPadding } from '../styles'
import * as actions from '../actionTypes'

const { width, height } = Dimensions.get('screen')
const imageComponentHeight = height / 3
const genreSliderHeight = 140

class Detail extends Component {
  static propTypes = {
    addSong: PropTypes.func.isRequired,
    isSongSearchLoading: PropTypes.bool,
    songAction: PropTypes.func.isRequired,
    detail: PropTypes.object.isRequired,
    recommendBasedOnGenres: PropTypes.func.isRequired,
    songSearch: PropTypes.func.isRequired,
    songResults: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    isSongSearchLoading: false,
  }

  constructor() {
    super()
    this.state = {
      showSearch: false,
    }
  }

  toggleSearch = () => this.setState({ showSearch: !this.state.showSearch })

  addSong = (song) => {
    this.toggleSearch()
    this.props.addSong(song)
  }

  playSong = uri => Linking
    .openURL(uri)
    .catch(err => console.log('Bitch doesnt have spotify or something', err))

  recommendBasedOnGenre = (genreName) => {
    this.props.recommendBasedOnGenres(genreName)
    this.props.history.push('home')
  }

  goToHome = () => {
    this.props.requestArtList(this.props.currentGalleryId)
    this.props.history.goBack()
  }

  render() {
    const {
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
          />
        </View>
        { music &&
        <React.Fragment>
          <View style={{ height: genreSliderHeight }}>
            <GenreSlider
              genres={music.genres}
              onPressGenre={this.recommendBasedOnGenre}
            />
          </View>
          {
            this.state.showSearch
              ? <SongSearch
                loading={this.props.isSongSearchLoading}
                cancelSearch={this.toggleSearch}
                addSong={this.addSong}
                search={this.props.songSearch}
                songs={this.props.songResults}
              />
              : <SongList
                height={height - genreSliderHeight - imageComponentHeight - galleryBottomNavHeight - headerPadding}
                songs={music.songs}
                addSong={this.toggleSearch}
                songAction={this.props.songAction}
                playSong={this.playSong}
              />
          }
        </React.Fragment>
        }
      </View>
    )
  }
}

export const mapStateToProps = state => ({
  isSongSearchLoading: state.musicProfile.isSongSearchLoading,
  currentGalleryId: state.galleryInfo.currentGalleryId,
  detail: state.galleryInfo.detail,
  songResults: state.musicProfile.songResults,
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
  recommendBasedOnGenres: genre => dispatch({
    type: actions.REQUEST_ART_LIST,
    payload: {
      genres: [genre],
    },
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Detail))
