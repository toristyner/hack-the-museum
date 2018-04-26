import React from 'react'
import { View, Text, ActivityIndicator, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { darkGray } from '../styles'

const { width, height } = Dimensions.get('window')

const myStyle = {
  container: {
    position: 'absolute',
    height,
    width,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    zIndex: 99999,
    alignItems: 'center',
  },
  loaderText: {
    color: darkGray,
    fontSize: 11,
  },
}

const Loader = (props) => {
  const style = props.active ? myStyle.container : { display: 'none' }
  return (
    <View style={style}>
      <ActivityIndicator active />
      <Text style={myStyle.loaderText}>{`${props.message}...`}</Text>
    </View>
  )
}

Loader.propTypes = {
  active: PropTypes.bool,
  message: PropTypes.string,
}

Loader.defaultProps = {
  active: false,
  message: 'Loading...',
}

const LoaderHOC = WrappedComponent => props => (
  <View style={{ flex: 1 }}>
    <Loader
      active={props.isLoading}
      message={props.loadingMessage}
    />
    <WrappedComponent {...props} />
  </View>
)

export default LoaderHOC
