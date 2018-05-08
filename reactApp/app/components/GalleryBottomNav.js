import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import GalleryBottomNavCircle from './GalleryBottomNavCircle'
import { withRouter } from 'react-router'
import { bloodOrange, galleryBottomNavHeight } from '../styles'
import * as actions from '../actionTypes'

const { width } = Dimensions.get('window')

const numOfPastGalleriesToDisplay = 5
const widthOfProfileContainer = 50
const horizontalPaddingOfNavContainer = 15
const widthOfEachLineBetweenNavButtons = (width - widthOfProfileContainer - horizontalPaddingOfNavContainer) / numOfPastGalleriesToDisplay

class GalleryBottomNav extends Component {
    static propTypes = {
      activeGalleryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      navToRecomendations: PropTypes.func.isRequired,
      navToArtList: PropTypes.func.isRequired,
      history: PropTypes.func.isRequired,
      genres: PropTypes.object.isRequired,
      profileComplete: PropTypes.bool.isRequired,
    }

    onGalleryNav = (galleryId) => {
      this.props.history.push('home')
      this.props.navToArtList(galleryId)
    }

    onProfileButtonPress = () => {
      this.props.history.push('home')
      this.props.navToRecomendations(Object.keys(this.props.genres))
    }

    render() {
      if (!this.props.profileComplete) { return null }
      return (
        <View
          style={styles.bottomNavContainer}
        >
          <TouchableOpacity
            onPress={this.onProfileButtonPress}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: widthOfProfileContainer,
              borderRightColor: 'white',
              borderRightWidth: StyleSheet.hairlineWidth,
            }}
          >
            <Icon
              color="white"
              size={48}
              name="ios-person"
              iconStyle={{
                textShadowColor: 'black',
                textShadowRadius: 5,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: 10,
              flex: 1,
            }}
          >
            {
              this.props.galleryPath
                ? this.props.galleryPath.map((galleryId, i) => (
                  <View
                    key={`${galleryId}${i}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      bottom: 5,
                    }}
                  >
                    <GalleryBottomNavCircle
                      onGalleryNav={this.onGalleryNav}
                      index={i}
                      galleryId={galleryId}
                      active={i === this.props.galleryPath.length - 1}
                    />
                    {
                      i !== this.props.galleryPath.length - 1 &&
                      <View style={{
                        width: widthOfEachLineBetweenNavButtons,
                        height: 1,
                        backgroundColor: 'white',
                      }}
                      />
                    }
                  </View>
                ))
                : <Text>Get your ass to a gallery</Text>

            }
          </View>
        </View>
      )
    }
}

export const mapStateToProps = state => ({
  galleryPath: state.galleryInfo.history,
  activeGalleryId: state.galleryInfo.history[state.galleryInfo.history.length - 1],
  profileComplete: state.musicProfile.profileComplete,
  genres: state.musicProfile.genres,
})

export const mapDispatchToProps = dispatch => ({
  navToArtList: galleryId => dispatch({
    type: actions.REQUEST_ART_LIST,
    payload: { galleryId },
  }),
  navToRecomendations: genres => dispatch({
    type: actions.REQUEST_ART_LIST,
    payload: { genres },
  }),
})

const styles = {
  bottomNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: bloodOrange,
    height: galleryBottomNavHeight,
    width,
  },
}

GalleryBottomNav.propTypes = {
  galleryPath: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GalleryBottomNav))
