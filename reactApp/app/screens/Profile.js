import React, { Component } from 'react'
import { TouchableOpacity, Dimensions, FlatList, Text, View, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GenreTile, withLoader } from '../components'
import * as actions from '../actionTypes'
import * as _ from 'lodash'
import { styles, lighterGray, bloodOrange, white } from '../styles'
import galleryInfo from '../reducers/galleryInfoReducer'

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

  completeProfile = () => {
    this.props.completeProfile()
    this.props.history.push('home')
  }

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
    const genresAreSelected = !_.isEmpty(this.state.myGenres)
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

        <TouchableOpacity
          onPress={() => this.completeProfile()}
          title="Learn More"
          style={genresAreSelected ? myStyle.buttonStyle : { ...myStyle.buttonStyle, ...myStyle.disabledStyle }}
        >
          <Text style={styles.boldWhite}>Continue</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const myStyle = {
  container: {
    flex: 1,
  },
  disabledStyle: {
    backgroundColor: 'rgba(206, 206, 206, 0.8)',
  },
  buttonStyle: {
    margin: 10,
    bottom: 10,
    marginLeft: '10%',
    marginRight: '10%',
    position: 'absolute',
    backgroundColor: 'rgba(226, 82, 65, 0.8)',
    flex: 1,
    width: '80%',
  },
  backgroundImage: {
    position: 'absolute',
    height,
    width,
  },
}

export const mapStateToProps = state => ({
  popularGenres: state.musicProfile.popularGenres,
  myGenres: state.musicProfile.genres,
  galleryPath: state.galleryInfo.history,
})

export const mapDispatchToProps = dispatch => ({
  completeProfile: () => dispatch({
    type: actions.COMPLETE_MUSIC_PROFILE,
  }),
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
