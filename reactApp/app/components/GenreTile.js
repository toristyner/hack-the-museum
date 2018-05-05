import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { white } from '../styles'

const GenreTile = (props) => {
  let style = {
    ...myStyle.container,
    backgroundColor: props.color,
  }
  let textStyle = myStyle.label
  if (props.size === 'small') {
    style = {
      ...style,
      ...{
        width: 90,
        height: 90,
      },
    }
    textStyle = {
      ...textStyle,
      fontSize: 12,
    }
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={style}
    >
      <View style={{ flex: 2 }}>
        <Icon
          size={props.size === 'small' ? 40 : 60}
          color={white}
          name="ios-musical-notes"
        />
      </View>
      <Text style={textStyle}>{props.name}</Text>
    </TouchableOpacity>
  )
}

const myStyle = {
  container: {
    width: 110,
    height: 110,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    flexDirection: 'column',
  },
}


GenreTile.propTypes = {
  onPress: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
}

GenreTile.defaultProps = {
  size: 'large',
}

export default GenreTile
