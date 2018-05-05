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
    }

    onGalleryNav = (galleryId) => {
      this.props.history.push('home')
      this.props.navToArtList(galleryId)
    }

    onProfileButtonPress = () => {
      this.props.history.push('profile')
    }

    render() {
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
              paddingHorizontal: 10,
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

/* <View style={styles.activeContainer}>
            <Text style={[styles.text, { fontSize: 12 }]}>Active</Text>
            <Text style={[styles.textShadow, { fontSize: 20 }]}>
              {this.props.activeGalleryId.toString()}
            </Text>
          </View> */

export const mapStateToProps = ({ galleryInfo }) => ({
  galleryPath: galleryInfo.history,
  activeGalleryId: galleryInfo.history[galleryInfo.history.length - 1],
})

export const mapDispatchToProps = dispatch => ({
  navToArtList: galleryId => dispatch({
    type: actions.REQUEST_ART_LIST,
    payload: { galleryId },
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
  // activeContainer: {
  //   borderLeftWidth: StyleSheet.hairlineWidth,
  //   borderLeftColor: 'white',
  //   flex: 1,
  //   height: galleryBottomNavHeight,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
}

GalleryBottomNav.propTypes = {
  galleryPath: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GalleryBottomNav))
