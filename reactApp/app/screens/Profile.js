import React, { Component } from 'react'
import { TouchableOpacity, Dimensions, FlatList, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { GenreTile, withLoader } from '../components'
import * as actions from '../actionTypes'
import { styles, lighterGray } from '../styles'
import pamImage from '../assets/pam.jpg'

const { height, width } = Dimensions.get('window')
class Profile extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    getPopularGenres: PropTypes.func.isRequired,
    popularGenres: PropTypes.array.isRequired,
    toggleGenre: PropTypes.func.isRequired,
    completeProfile: PropTypes.func.isRequired,
  }

  state = {
    myGenres: {},
  }

  componentDidMount = () => this.props.getPopularGenres()

  completeProfile = () => {
    this.props.completeProfile()
    this.props.history.replace('/recommendations')
  }

  toggleGenre = (genre) => {
    const myNewGenres = { ...this.state.myGenres }
    const isLiked = myNewGenres[genre.name] !== undefined
    let action
    if (isLiked) {
      delete myNewGenres[genre.name]
      action = actions.USER_PROFILE_UNLIKE_GENRES
    } else {
      // set to 1 since it is first time liking genre
      myNewGenres[genre.name] = 1
      action = actions.USER_PROFILE_LIKE_GENRES
    }
    this.setState({ myGenres: myNewGenres })
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
    const genresAreSelected = !isEmpty(this.state.myGenres)

    return (
      <View style={myStyle.container}>
        <Image
          source={pamImage}
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
          style={{
            ...myStyle.buttonStyle,
            ...(!genresAreSelected ? myStyle.disabledStyle : {}),
          }}
          disabled={!genresAreSelected}
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
    paddingBottom: 85,
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
