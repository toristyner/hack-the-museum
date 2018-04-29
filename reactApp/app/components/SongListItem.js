import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { styles } from '../styles'

const SongListItem = props => (
  <View style={myStyle.container}>
    <View
      style={myStyle.playButton}
    />
    <View style={myStyle.details}>
      <Text style={styles.bold}>{props.title}</Text>
      <Text style={styles.boldItalic}>{props.subtitle}</Text>
    </View>
    <View
      style={myStyle.rightIcon}
    />
  </View>
)


const myStyle = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    borderWidth: 1,
  },
  details: {
    alignItems: 'flex-start'
  },
  playButton: {
    width: 70,
    height: 70,
    borderRightWidth: 1
  },
  rightIcon: {
    width: 70,
    height: 70,
    borderLeftWidth: 1
  }
}

SongListItem.propTypes = {
  photoUrl: PropTypes.string
}

SongListItem.defaultProps = {}

export default SongListItem