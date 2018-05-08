import React from 'react'
import { Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { numOfGalleryTilesPerRow } from '../styles'
import placeholderImage from '../assets/placeholder-tile.png'

const { width } = Dimensions.get('window')
const baseDim = (width - 50) / numOfGalleryTilesPerRow
const myStyle = {
  container: {
    position: 'relative',
    width: baseDim,
    height: baseDim,
    marginRight: 15,
    backgroundColor: 'white',
    shadowOpacity: 0.75,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
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
        defaultSource={placeholderImage}
      />
    ) : (
      <ActivityIndicator active />
    )}
    {props.renderOverlay && props.renderOverlay()}
  </TouchableOpacity>
)
Tile.propTypes = {
  onPress: PropTypes.func.isRequired,
  renderOverlay: PropTypes.func,
  photoUrl: PropTypes.string.isRequired,
}

Tile.defaultProps = {
  renderOverlay: null,
}

export default Tile
