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
      fontSize: 14,
    }
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={style}
    >
      <View style={myStyle.inner}>
        <View style={myStyle.note}>
          <Icon
            size={props.size === 'small' ? 80 : 90}
            color={white}
            name="ios-musical-notes"
          />
        </View>
        <View style={myStyle.labelContainer}>
          <Text style={textStyle}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const myStyle = {
  container: {
    width: 110,
    height: 110,
    margin: 5,
    padding: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    opacity: 0.3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',

  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
  },
}


GenreTile.propTypes = {
  onPress: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  color: PropTypes.string,
}

GenreTile.defaultProps = {
  size: 'large',
  color: 'purple',
}

export default GenreTile
