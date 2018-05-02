import React, { Component } from 'react'
import { ScrollView, StyleSheet, Linking } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ArtImage, GenreSlider, SongList, withLoader } from '../components/'
import { styles } from '../styles'
import * as actions from '../actionTypes'

class Detail extends Component {
  static propTypes = {
    addSong: PropTypes.func.isRequired,
    likeSong: PropTypes.func.isRequired,
    detail: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {}
  }

  playSong = uri => Linking
    .openURL(uri)
    .catch(err => console.log('Bitch doesnt have spotify or something', err))

  navToArtList = () => this.props.history.push('home')

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
          onBack={this.navToArtList}
          photoUrl={photoUrl}
          title={Title}
          artist={Artist}
          style={Style}
          year={Dated}
        />
        <GenreSlider
          genres={music && music.genres}
          onPressGenre={id => console.log('genre', id)}
        />
        <SongList
          songs={music && music.songs}
          addSong={this.props.addSong}
          likeSong={this.props.likeSong}
          playSong={this.playSong}
        />
      </ScrollView>
    )
  }
}

export const mapStateToProps = ({ galleryInfo }) => ({
  detail: galleryInfo.detail,
})

export const mapDispatchToProps = dispatch => ({
  addSong: () => dispatch({
    type: actions.ADD_SONG,
  }),
  likeSong: song => dispatch({
    type: actions.LIKE_SONG,
    payload: { song },
  }),
  searchSong: () => dispatch({
    type: actions.SEARCH_SONG,
    payload: {},
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
