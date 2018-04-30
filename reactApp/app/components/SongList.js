import React from 'react'
import { Image, FlatList, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { styles } from '../styles'
import { SongListItem, IconButton } from '.';

const { width, height } = Dimensions.get('window')

const SongList = props => (
  <View style={myStyle.container}>
    <View style={myStyle.row}>
      <Text style={myStyle.title}>{`Songs`}</Text>
      <IconButton
          name='ios-add'
          size={28}
          onPress={props.addSong}
        />
    </View>
    <FlatList
      data={props.songs}
      keyExtractor={item => `song${item.id}`}
      renderItem={({ item }) => (
        <SongListItem 
          name={item.name}
          artist={item.artist.name}
          onLike={props.likeSong}
          onPlay={props.playSong}
        />
      )}
    />
  </View>
)


const myStyle = {
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    ...styles.bold,
  },
  row: {
    ...styles.row,
    padding: 5
  },
  scroller: {
    flexDirection: 'column',
    margin: 10
  },
}

SongList.propTypes = {
  photoUrl: PropTypes.string
}

SongList.defaultProps = {}

export default SongList