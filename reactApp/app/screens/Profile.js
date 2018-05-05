import React, { Component } from 'react'
import { Dimensions, FlatList, Text, View, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GenreTile, withLoader } from '../components'
import * as actions from '../actionTypes'
import { styles, white, likedColor, lighterGray } from '../styles'

const { height, width } = Dimensions.get('window')
class Profile extends Component {
  static propTypes = {
    // getPopularGenres: PropTypes.func.isRequired,
    // popularGenres: PropTypes.obj.isRequired,
    // toggleGenre: PropTypes.func.isRequired,
  }

  state = {
    refreshCount: 0,
    myGenres: {},
  }

  componentDidMount = () => this.props.getPopularGenres()

  toggleGenre = (genre) => {
    const myNewGenres = { ...this.state.myGenres }
    const isLiked = myNewGenres[genre.name] !== undefined
    let action
    if (isLiked) {
      delete myNewGenres[genre.name]
      action = actions.USER_PROFILE_UNLIKE_GENRES
    } else {
      myNewGenres[genre.name] = genre.popularity
      action = actions.USER_PROFILE_LIKE_GENRES
    }
    this.setState({ myGenres: myNewGenres }, () => console.log(this.state))
    this.props.toggleGenre(genre.name, action)
  }

  renderGenre = (item) => {
    const isLiked = this.state.myGenres[item.name] !== undefined
    return (
      <GenreTile
        onPress={() => this.toggleGenre(item)}
        name={item.name}
        color={isLiked ? lighterGray : item.color}
      />
    )
  }

  render() {
    return (
      <View style={myStyle.container}>
        <Image
          source={require('../assets/pam.jpg')}
          style={myStyle.backgroundImage}
        />
        <Text style={styles.boldWhite}>Pick your favorite genres to get started!</Text>
        <FlatList
          contentContainerStyle={styles.grid}
          data={this.props.popularGenres}
          extraData={this.state.myGenres}
          keyExtractor={(item, index) => `${item.name}${index}`}
          horizontal={false}
          renderItem={({ item }) => this.renderGenre(item)}
        />
      </View>
    )
  }
}

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    height,
    width,
  },
})

export const mapStateToProps = ({ musicProfile }) => ({
  popularGenres: musicProfile.popularGenres,
  myGenres: musicProfile.genres,
})

export const mapDispatchToProps = dispatch => ({
  getPopularGenres: () => dispatch({
    type: actions.REQUEST_POPULAR_GENRES,
  }),
  toggleGenre: (genre, actionType) => dispatch({
    type: actionType,
    payload: {
      genres: [genre],
    },
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Profile))
