import React, { Component } from 'react'
import { Image, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { ArtImage, GenreSlider, SongList, withLoader } from '../components/'
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
      Style
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
        <GenreSlider />
        <SongList />
      </ScrollView>
    )
  }
}

export const mapStateToProps = ({ galleryInfo }) => ({
  detail: galleryInfo.detail,
})

export const mapDispatchToProps = dispatch => ({})

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
