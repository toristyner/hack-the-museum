import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'

const IconButton = ({ disabled, onPress, ...props }) => {
  const Wrapper = disabled ? View : TouchableOpacity

  return (
    <Wrapper {...(!disabled ? { onPress } : {})}>
      <Icon {...props} />
    </Wrapper>
  )
}

IconButton.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}

IconButton.defaultProps = {
  disabled: false,
}

export default IconButton
