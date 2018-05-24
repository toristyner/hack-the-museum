import React from 'react'
import { FlatList, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { styles } from '../styles'
import { SongListItem, IconButton } from '.'

const SongList = props => (
  <View style={{ ...myStyle.container, height: props.height }}>
    <View style={myStyle.row}>
      <Text style={myStyle.title}>Songs</Text>
      <IconButton
        style={myStyle.addButton}
        name="md-add"
        size={23}
        onPress={props.addSong}
      />
    </View>
    <FlatList
      contentContainerStyle={{
        paddingBottom: 15,
      }}
      data={props.songs}
      keyExtractor={item => `song${item.id}`}
      renderItem={({ item }) => (
        <SongListItem
          name={item.name}
          artist={item.artist.name}
          image={item.images && item.images.length ? item.images[0].url : null}
          onSongAction={() => props.songAction(item.isLiked, item)}
          onSongMenu={() => props.onSongMenu(item.id)}
          onPlay={() => props.playSong(item.uri)}
          isLiked={item.isLiked}
          addedByUser={item.addedByUser}
        />
      )}
    />
  </View>
)

const myStyle = {
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    ...styles.bold,
  },
  row: {
    ...styles.row,
  },
  scroller: {
    flexDirection: 'column',
    margin: 10,
  },
  addButton: {
    paddingRight: 11,
  },
}

SongList.propTypes = {
  addSong: PropTypes.func.isRequired,
  songAction: PropTypes.func.isRequired,
  onSongMenu: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired,
}

export default SongList
