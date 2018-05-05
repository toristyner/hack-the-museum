import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { lighterGray, darkGray } from '../styles'

const SongSearchItem = ({ item, addSong }) => (
  <View>
    <TouchableOpacity
      onPress={() => addSong(item)}
      style={myStyle.songRow}
    >
      <Image
        source={item.images.url ? { uri: item.images.url } : {}}
        style={myStyle.image}
      />
      <View style={myStyle.info}>
        <Text style={myStyle.title}>
          {item.name}
        </Text>
        <Text style={myStyle.artist}>
          {item.artist.name}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

SongSearchItem.propTypes = {
  item: PropTypes.object.isRequired,
  addSong: PropTypes.func.isRequired,
}

const myStyle = {
  songRow: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: lighterGray,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
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
    paddingRight: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  artist: {
    color: darkGray,
  },
}

export default SongSearchItem
