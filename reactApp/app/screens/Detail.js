import React, { Component } from 'react'
import { Image, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { withLoader } from '../components/'
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
    } = this.props.detail
    return (
      <ScrollView contentContainerStyle={myStyles.container}>
        <Text style={myStyles.title}>{Title}</Text>
        <Image
          style={{ width: '70%', height: '70%' }}
          source={{ uri: photoUrl }}
        />
        <Text style={myStyles.title}>{Artist}</Text>
        <Text style={myStyles.text}>{GalleryLabel}</Text>
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
    ...styles.container,
    margin: 5,
    marginTop: 10,
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
