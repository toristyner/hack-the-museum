import React from 'react'
import { Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { lightGray } from '../styles'

const { width } = Dimensions.get('window')
const baseDim = (width - 20) / 2
const myStyle = {
  container: {
    flex: 1,
    width: baseDim,
    height: baseDim,
    backgroundColor: lightGray,
    margin: 2,
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
    {
      props.photoUrl
        ? <Image
          style={{ height: baseDim, width: baseDim }}
          source={{ uri: props.photoUrl }}
        />
        : <ActivityIndicator active />
    }
  </TouchableOpacity>
)
Tile.propTypes = {
  onPress: PropTypes.func.isRequired,
}

Tile.defaultProps = {}

export default Tile
