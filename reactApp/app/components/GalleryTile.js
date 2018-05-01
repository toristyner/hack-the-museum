import React from 'react'
import { Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { lightGray, numOfGalleryTilesPerRow } from '../styles'

const { width } = Dimensions.get('window')
const baseDim = (width - 50) / numOfGalleryTilesPerRow
const myStyle = {
  container: {
    width: baseDim,
    height: baseDim,
    backgroundColor: 'white',
    shadowOpacity: 0.75,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: baseDim,
    height: baseDim,
  },
}

const Tile = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={myStyle.container}
  >
    {props.photoUrl ? (
      <Image
        style={{ height: baseDim, width: baseDim }}
        source={{ uri: props.photoUrl }}
      />
    ) : (
      <ActivityIndicator active />
    )}
  </TouchableOpacity>
)
Tile.propTypes = {
  onPress: PropTypes.func.isRequired,
}

Tile.defaultProps = {}

export default Tile
