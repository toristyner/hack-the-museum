import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { white } from '../styles'

const BackButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={myStyle.container}
  >
    <Icon
      color={props.color}
      name="md-arrow-back"
      size={30}
    />
  </TouchableOpacity>
)

const myStyle = {
  container: {
    padding: 10,
    position: 'absolute',
    zIndex: 99999,
  },
}

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
}
BackButton.defaultProps = {
  color: white,
}

export default BackButton
