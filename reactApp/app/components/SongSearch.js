import React from 'react'
import { Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { SearchBar } from './'
import { transparentDark, styles, lighterGray, bloodOrange } from '../styles'
import SongSearchItem from './SongSearchItem'
import { search } from '../utils/PhilaMuseumService'

const searchBarHeight = 80

const SongSearch = props => (
  <View style={myStyle.container}>
    <View style={myStyle.row}>
      <View style={myStyle.searchBarContainer}>
        <View style={myStyle.searchBarTitle}>
          <Text style={myStyle.searchTitle}>
            Song Search
          </Text>
          <TouchableOpacity
            onPress={props.cancelSearch}
            style={myStyle.closeButton}
          >
            <Icon
              name="md-close"
              color="white"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <SearchBar
          style={myStyle.searchBar}
          onChangeText={props.search}
          placeholder="Artist Name or Song Title"
        />
      </View>
    </View>
    <View>
      { props.loading ?
        <ActivityIndicator
          style={myStyle.indicator}
          size="large"
        />
        :
        <FlatList
          contentContainerStyle={{
            paddingBottom: searchBarHeight,
          }}
          data={props.songs}
          keyExtractor={item => `song${item.id}`}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <SongSearchItem
              addSong={props.addSong}
              item={item}
            />
          )}
        />
      }
    </View>
  </View>
)

const myStyle = {
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: transparentDark,
  },
  searchBarContainer: {
    flex: 1,
    height: searchBarHeight,
    backgroundColor: bloodOrange,
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchBarTitle: {
    paddingBottom: 10,
    flexDirection: 'row',
  },
  searchTitle: {
    flex: 1,
    paddingTop: 10,
    color: 'white',
    fontSize: 18,
  },
  searchBar: {
    backgroundColor: 'white',
    color: bloodOrange,
  },
  row: {
    ...styles.row,
    justifyContent: 'flex-start',
  },
  songRow: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: lighterGray,
  },
  closeButton: {
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: -10,
    justifyContent: 'flex-end',
  },
  indicator: {
    top: 120,
  },
}

SongSearch.propTypes = {
  addSong: PropTypes.func.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}

SongSearch.defaultProps = {
  loading: false,
}

export default SongSearch
