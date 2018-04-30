import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { styles, lightGray, white } from '../styles'
import { IconButton } from '.';

const SongListItem = props => (
  <View
    style={myStyle.container}
  >
    <TouchableOpacity
      style={myStyle.playButton}
      onPress={props.onPlay}
    >
      <Icon
        color={white}
        name="ios-play"
        size={44}
      />
    </TouchableOpacity>
    <View style={myStyle.details}>
      <Text style={styles.boldItalic}>{props.name}</Text>
      <Text style={styles.bold}>{props.artist}</Text>
    </View>
    <View
      style={myStyle.rightIcon}
    >
      <IconButton
        onPress={props.onLike}
        color={lightGray}
        name="md-thumbs-up"
        size={30}
      />
    </View>
  </View>
)


const myStyle = {
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: white,
    height: 45,
    margin: 10,
    shadowOffset:{  width: 2,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  details: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  playButton: {
    width: 45,
    height: 45,
    backgroundColor: lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightIcon: {
    width: 45,
    height: 45,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: lightGray
  }
}

SongListItem.propTypes = {
  photoUrl: PropTypes.string
}

SongListItem.defaultProps = {}

export default SongListItem