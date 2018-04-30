import React, { Component } from 'react'
import { Image, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { ArtImage, GenreSlider, SongList, withLoader, BackButton } from '../components/'
import { styles } from '../styles'
import * as actions from '../actionTypes'

class Detail extends Component {
  static propTypes = {}

  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {
      Title,
      Artist,
      GalleryLabel,
      photoUrl,
      Dated,
      Style,
      music
    } = this.props.detail

    return (
      <ScrollView contentContainerStyle={myStyles.container}>
        <ArtImage
          photoUrl={photoUrl}
          title={Title}
          artist={Artist}
          style={Style}
          year={Dated}
        />
        <GenreSlider
          genres={music.genres}
          onPressGenre={(id) => console.log('genre', id)}
        />
        <SongList
          songs={music.songs}
          addSong={this.props.addSong}
          likeSong={this.props.likeSong}
          playSong={this.props.playSong}
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
    payload: {}
  }),
  likeSong: () => dispatch({
    type: actions.LIKE_SONG,
    payload: {}
  }),
  playSong: () => dispatch({
    type: actions.PLAY_SONG,
    payload: {}
  })
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
