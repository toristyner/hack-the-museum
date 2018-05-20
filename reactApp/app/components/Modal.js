import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { transparentDark } from '../styles'

const Modal = props =>
  (props.isVisible && props.children) && (
    <View style={myStyles.container}>
      <View style={myStyles.backdrop} />
      <View style={myStyles.contentContainer}>
        <View style={myStyles.content}>
          {props.children({ ...props })}
        </View>
      </View>
    </View>
  )

const myStyles = {
  container: {
    position: 'absolute',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  backdrop: {
    height: '100%',
    width: '100%',
    backgroundColor: transparentDark,
  },
  contentContainer: {
    position: 'absolute',
    minHeight: 130,
    top: 130,
    left: 0,
    right: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
}

Modal.propTypes = {
  children: PropTypes.func,
  isVisible: PropTypes.bool,
}

Modal.defaultProps = {
  isVisible: false,
}

export default Modal
