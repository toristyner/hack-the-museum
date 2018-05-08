import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { lighterGray, darkGray } from '../styles'

const SongSearchItem = ({ item, addSong }) => (
  <TouchableOpacity
    onPress={() => addSong(item)}
    style={myStyle.songRow}
  >
    <Image
      source={item.images.url ? { uri: item.images.url } : {}}
      style={myStyle.image}
    />
    <View style={myStyle.info}>
      <Text
        numberOfLines={1}
        style={myStyle.title}
      >
        {item.name}
      </Text>
      <Text style={myStyle.artist}>
        {item.artist.name}
      </Text>
    </View>
  </TouchableOpacity>
)

SongSearchItem.propTypes = {
  item: PropTypes.object.isRequired,
  addSong: PropTypes.func.isRequired,
}

const myStyle = {
  songRow: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: lighterGray,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  image: {
    top: 1,
    height: 32,
    width: 32,
    borderColor: lighterGray,
    borderWidth: 1,
  },
  info: {
    paddingLeft: 8,
    paddingRight: 30,
  },
  title: {
    fontWeight: 'bold',
  },
  artist: {
    color: darkGray,
  },
}

export default SongSearchItem
