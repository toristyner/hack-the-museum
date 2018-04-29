import React from 'react'
import { Image, FlatList, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { styles } from '../styles'
import { SongListItem } from '.';

const { width, height } = Dimensions.get('window')

const songs = [{
  id: 0
}]

const SongList = props => (
  <View style={myStyle.container}>
    <Text style={myStyle.title}>{`Top Songs`}</Text>
    <FlatList
      data={songs}
      keyExtractor={item => `song${item.id}`}
      renderItem={({ item }) => (
        <SongListItem 
          title={'Song Title'}
          subtitle={'Artist / Band Name'}
        />
      )}
    />
  </View>
)


const myStyle = {
  container: {
    padding: 10,
    height: 200
  },
  title: {
    ...styles.bold,
    marginBottom: 10
  },
  scroller: {
    flexDirection: 'column',
    margin: 10
  }
}

SongList.propTypes = {
  photoUrl: PropTypes.string
}

SongList.defaultProps = {}

export default SongList