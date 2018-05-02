import React from 'react'
import { Image, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { styles } from '../styles'
import BackButton from './BackButton'

const { width, height } = Dimensions.get('window')
const imageHeight = height / 3

const ArtImage = props => (
  <View
    style={myStyle.container}
  >
    <BackButton
      onPress={props.onBack}
    />
    <View style={myStyle.imageContainer}>
      <Image
        style={{ width: '100%', height: imageHeight }}
        source={{ uri: props.photoUrl }}
      />
    </View>
    <View style={myStyle.overlayContainer}>
      <Text style={styles.boldItalic}>{`${props.title}`}</Text>
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
    flex: 4,
    alignItems: 'center',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: '#cecece',
    opacity: 0.5,
    padding: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}

ArtImage.propTypes = {
  onBack: PropTypes.func.isRequired,
  photoUrl: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.string,
  year: PropTypes.string,
}

ArtImage.defaultProps = {
  photoUrl: null,
  title: '',
  style: '',
  year: '',
}

export default ArtImage