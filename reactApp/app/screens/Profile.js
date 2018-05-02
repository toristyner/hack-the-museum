import React, { Component } from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GenreTile, withLoader } from '../components';
import * as actions from '../actionTypes'
import { styles } from '../styles'
import { getGenreColor } from '../utils/ColorPicker';

class Profile extends Component {
  static propTypes = {
    // getPopularGenres: PropTypes.func.isRequired,
    // popularGenres: PropTypes.obj.isRequired,
    // toggleGenre: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.props.getPopularGenres()

  render() {
    return (
      <View style={myStyle.container}>
        <Text style={myStyle.title}>Songs</Text>
        <FlatList
          contentContainerStyle={styles.grid}
          data={this.props.popularGenres}
          keyExtractor={item => `gp${item.name}`}
          horizontal
          renderItem={({ item }) => (
            <GenreTile
              onPress={() => this.props.toggleGenre(item)}
              name={item.name}
              color={getGenreColor()}
            />
          )}
        />
      </View>
    )
  }
}

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const mapStateToProps = ({ musicProfile }) => ({
  popularGenres: musicProfile.popularGenres,
})

export const mapDispatchToProps = dispatch => ({
  getPopularGenres: () => dispatch({
    type: actions.REQUEST_POPULAR_GENRES,
  }),
  toggleGenre: () => dispatch({
    type: actions.TOGGLE_USER_PREFERRED_GENRE,
    payload: {},
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Profile))