import React from 'react'
import { Image, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { lightGray } from '../styles'

const { width, height } = Dimensions.get('window')
const imageHeight = height / 2.5

const ArtImage = props => (
  <View
    style={myStyle.container}
  >
    <View style={myStyle.imageContainer}>
      <Image
        style={{ width: '100%', height: imageHeight}}
        source={{ uri: props.photoUrl }}
      />
    </View>
    <View style={myStyle.overlayContainer}>
      <Text style={myStyle.boldItalic}>{`${props.title}`}</Text>
      <Text style={myStyle.date}>{`${props.style}, ${props.year}`}</Text>
    </View>
  </View>
)


const myStyle = {
  container: {
    width,
    height: imageHeight,
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center'
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: '#cecece',
    opacity: 0.5,
    padding: 10
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  }
}

ArtImage.propTypes = {
  photoUrl: PropTypes.string
}

ArtImage.defaultProps = {}

export default ArtImage