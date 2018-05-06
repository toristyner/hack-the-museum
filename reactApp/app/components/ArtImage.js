import React from 'react'
import { Text, View } from 'react-native'
import Image from 'react-native-image-progress'
import Circle from 'react-native-progress/Circle'
import PropTypes from 'prop-types'
import { styles, lighterGray } from '../styles'
import BackButton from './BackButton'

const ArtImage = props => (
  <View style={{ ...myStyle.container, height: props.imageHeight }}>
    <BackButton
      onPress={props.onBack}
    />
    <View style={myStyle.imageContainer}>
      <Image
        source={props.photoUrl ? { uri: props.photoUrl } : {}}
        indicator={({ progress }) => (
          <Circle
            color={indicatorColor}
            progress={progress}
            style={myStyle.indicator}
          />
        )}
        style={{
          width: '100%',
          height: props.imageHeight,
        }}
      />
    </View>
    <View style={myStyle.overlayContainer}>
      <Text
        style={styles.boldItalic}
        numberOfLines={1}
      >{`${props.title}`}
      </Text>
      <Text style={myStyle.date}>{`${props.style}, ${props.year}`}</Text>
    </View>
  </View>
)

const indicatorColor = 'rgba(255, 255, 255, 0.5)'
const myStyle = {
  container: {
    width: '100%',
  },
  imageContainer: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: lighterGray,
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
  indicator: {
    top: -28,
  },
}

ArtImage.propTypes = {
  onBack: PropTypes.func.isRequired,
  photoUrl: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.string,
  year: PropTypes.string,
  imageHeight: PropTypes.number.isRequired,
}

ArtImage.defaultProps = {
  photoUrl: null,
  title: '',
  style: '',
  year: '',
}

export default ArtImage
