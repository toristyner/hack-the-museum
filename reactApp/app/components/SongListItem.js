import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { styles, lightGray, white, likedColor, transparentWhite, darkGray } from '../styles'
import { IconButton } from '.'

const SongListItem = props => (
  <View
    style={myStyle.container}
  >
    <TouchableOpacity
      style={myStyle.playButtonContainer}
      onPress={props.onPlay}
    >
      {props.image && (
        <Image
          style={myStyle.songImage}
          source={props.image ? { uri: props.image } : {}}
        />
      )}
      <Icon
        name="ios-play"
        size={44}
        style={myStyle.playButton}
        color={transparentWhite}
      />
    </TouchableOpacity>
    <View style={myStyle.details}>
      <Text
        style={myStyle.songName}
        numberOfLines={1}
      >
        {props.name}
      </Text>
      <Text
        style={myStyle.songArtist}
        adjustsFontSizeToFit
      >
        {props.artist}
      </Text>
    </View>
    <View
      style={myStyle.rightIcon}
    >
      <IconButton
        onPress={props.onSongAction}
        disabled={props.addedByUser}
        color={props.isLiked || props.addedByUser ? likedColor : lightGray}
        name={props.addedByUser ? 'md-contact' : 'md-thumbs-up'}
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
    margin: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  details: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  playButtonContainer: {
    position: 'relative',
    width: 45,
    height: 45,
    backgroundColor: lightGray,
  },
  songName: {
    ...styles.bold,
    fontSize: 14,
  },
  songArtist: {
    fontSize: 11,
    color: darkGray,
  },
  songImage: {
    width: 45,
    height: 45,
  },
  playButton: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rightIcon: {
    width: 45,
    height: 45,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: lightGray,
  },
}

SongListItem.propTypes = {
  addedByUser: PropTypes.bool.isRequired,
  artist: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onSongAction: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,

}

SongListItem.defaultProps = {}

export default SongListItem
