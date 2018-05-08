import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { white } from '../styles'

const BackButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{ ...myStyle.container, ...props.style }}
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
  style: PropTypes.object,
}
BackButton.defaultProps = {
  color: white,
  style: {},
}

export default BackButton
