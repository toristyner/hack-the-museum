import React, { Component } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { GalleryTile } from '../components'

class List extends Component {
    static navigationOptions = {
      title: 'Galleries',
    }

    static renderGalleryTile() {
      return (
        <GalleryTile />
      )
    }

    static galleryKeyExtractor(item) {
      return item.id.toString()
    }

    state = {
      galleries: Array(40).fill().map((val, index) => ({ id: index })),
    }

    render() {
      return (
        <ScrollView style={styles.scrollViewContainer}>
          <FlatList
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={styles.listContainer}
            keyExtractor={List.galleryKeyExtractor}
            renderItem={List.renderGalleryTile}
            data={this.state.galleries}
          />
        </ScrollView>
      )
    }
}

const styles = {
  scrollViewContainer: {
    paddingHorizontal: 10,
  },
  listContainer: {
    justifyContent: 'space-between',
    marginTop: 5,
  },
}

export default List
