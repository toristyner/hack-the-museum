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

const mockGalleryPath = [
  111, 116,
]
const numOfPastGalleriesToDisplay = 5

class GalleryBottomNav extends Component {
    static propTypes = {
      activeGalleryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }
    static defaultProps = {
      activeGalleryId: 111,
    }

    onGalleryNav = (galleryId) => {
      this.props.history.push('home')
      this.props.navToArtList(galleryId)
    }

    render() {
      return (
        <View
          style={styles.bottomNavContainer}
        >
          {
            this.props.galleryPath
              ? mockGalleryPath.map((galleryId, i) => (
                <View
                  key={`${galleryId}${i}`}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <GalleryBottomNavCircle
                    index={i}
                    galleryId={galleryId}
                    active={i === mockGalleryPath.length - 1}
                    onGalleryNav={this.onGalleryNav}
                  />
                  {
                    i !== mockGalleryPath.length - 1 &&
                    <View style={{
                      width: width / numOfPastGalleriesToDisplay,
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
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
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
