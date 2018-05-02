import React from 'react'
import { Text, TouchableOpacity, View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { SearchBar } from './'
import { darkGray, styles } from '../styles'

const SongSearch = (props) => {
  return (
    <View style={myStyle.container}>
      <View style={myStyle.row}>
        <View style={{flex: 4}}>
          <SearchBar
            onChangeText={props.search}
          />
        </View>
        <TouchableOpacity
          onPress={props.cancelSearch}
          style={{flex: 0.5}}
        >
          <Icon
            name="md-close"
            color={darkGray}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={myStyle.resultsContainer}>
        <FlatList
          data={props.songs}
          keyExtractor={item => `song${item.id}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => props.addSong(item)}
              style={myStyle.songRow}
            >
              <Text>{`${item.name}, ${item.artist.name}`}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

const myStyle = {
  container: {
    flex: 1,
  },
  row: {
    ...styles.row,
    justifyContent: 'flex-start',
  },
  resultsContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  songRow: {
    paddingBottom: 10,
  },
}

SongSearch.propTypes = {
  addSong: PropTypes.func.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
}

export default SongSearch
