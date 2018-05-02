import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Linking } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ArtImage, GenreSlider, SongList, SongSearch, withLoader } from '../components/'
import { styles } from '../styles'
import * as actions from '../actionTypes'

class Detail extends Component {
  static propTypes = {
    addSong: PropTypes.func.isRequired,
    likeSong: PropTypes.func.isRequired,
    detail: PropTypes.object.isRequired,
    recommendBasedOnGenres: PropTypes.func.isRequired,
    songSearch: PropTypes.func.isRequired,
    songResults: PropTypes.arrayOf(PropTypes.object),
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
      <ScrollView contentContainerStyle={myStyles.container}>
        <ArtImage
          onBack={this.goToHome}
          photoUrl={photoUrl}
          title={Title}
          artist={Artist}
          style={Style}
          year={Dated}
        />
        { music &&
        <View>
          <GenreSlider
            genres={music.genres}
            onPressGenre={this.recommendBasedOnGenre}
          />
          {
            this.state.showSearch
              ? <SongSearch
                cancelSearch={this.toggleSearch}
                addSong={this.addSong}
                search={this.props.songSearch}
                songs={this.props.songResults}
              />
              : <SongList
                songs={music.songs}
                addSong={this.toggleSearch}
                likeSong={this.props.likeSong}
                playSong={this.playSong}
              />
          }
        </View>
        }
      </ScrollView>
    )
  }
}

export const mapStateToProps = state => ({
  currentGalleryId: state.galleryInfo.currentGalleryId,
  detail: state.galleryInfo.detail,
  songResults: state.musicProfile.songResults,
})

export const mapDispatchToProps = dispatch => ({
  addSong: song => dispatch({
    type: actions.ADD_SONG,
    payload: { song },
  }),
  likeSong: song => dispatch({
    type: actions.LIKE_SONG,
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
