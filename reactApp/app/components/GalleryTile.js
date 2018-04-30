import React from 'react'
import { Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { lightGray } from '../styles'

const { width } = Dimensions.get('window')
const baseDim = (width - 50) / 3
const myStyle = {
  container: {
    width: baseDim,
    height: baseDim,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  image: {
    width: 114,
    height: 114,
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
      <ActivityIndicator
        style={{
        }}
        active
      />
    )}
  </TouchableOpacity>
)
Tile.propTypes = {
  onPress: PropTypes.func.isRequired,
}

Tile.defaultProps = {}

export default Tile
