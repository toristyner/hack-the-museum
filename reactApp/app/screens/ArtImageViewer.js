import React from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Image from 'react-native-image-progress'
import Circle from 'react-native-progress/Circle'

const ArtImageViewer = ({ imageUrl, history }) => (
  <View style={myStyle.container}>
    <Image
      source={imageUrl ? { uri: imageUrl } : {}}
      indicator={({ progress }) => (
        <Circle
          color="rgba(255, 255, 255, 0.5)"
          progress={progress}
          style={myStyle.indicator}
        />
      )}
      resizeMode="center"
      style={myStyle.image}
    />
    <TouchableOpacity
      style={myStyle.closeButton}
      onPress={history.goBack}
    >
      <Icon
        name="md-close"
        color="white"
        size={30}
      />
    </TouchableOpacity>
  </View>
)

const { height, width } = Dimensions.get('window')
const myStyle = {
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  image: {
    height,
    width,
  },
  indicator: {
    top: -28,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}

ArtImageViewer.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export const mapStateToProps = state => ({
  imageUrl: state.galleryInfo.detail.Image,
})

export default connect(mapStateToProps)(ArtImageViewer)
