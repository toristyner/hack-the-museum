import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { styles } from '../styles'

const IconButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
  >
  <Icon
    { ...props }
  />
  </TouchableOpacity>

)

export default IconButton