import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { withRouter } from 'react-router'
import { bloodOrange, galleryBottomNavHeight } from '../styles'
import * as actions from '../actionTypes'

const { width } = Dimensions.get('window')


const Circle = props => (
  <View style={[styles.circle, {
    height: props.size,
    width: props.size,
    ...props.style,
  }]}
  />)

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
          <View
            style={styles.historyContainer}
          >
            {
              this.props.galleryPath
                ? this.props.galleryPath.map((galleryId, i) => (
                  <TouchableOpacity
                    key={`${galleryId}${i}`}
                    onPress={() => this.onGalleryNav(galleryId)}
                    style={{ flex: 1, alignItems: 'center' }}
                  >
                    <Circle size={9} />
                    <Text style={styles.text}>{galleryId}</Text>
                  </TouchableOpacity>
                ))
                : <Text>Get your ass to a gallery</Text>
            }
          </View>
          {/* <View style={styles.activeContainer}>
            <Text style={[styles.text, { fontSize: 12 }]}>Active</Text>
            <Text style={[styles.textShadow, { fontSize: 20 }]}>
              {this.props.activeGalleryId.toString()}
            </Text>
          </View> */}
        </View>
      )
    }
}

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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bloodOrange,
    height: galleryBottomNavHeight,
    width,
  },

  circle: {
    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'white',
  },
  historyContainer: {
    flexDirection: 'row',
    flex: 5,
    justifyContent: 'space-around',
  },
  activeContainer: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: 'white',
    flex: 1,
    height: galleryBottomNavHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Arial',
    color: 'white',
  },
  textShadow: {
    fontFamily: 'Arial',
    color: 'white',
    textShadowColor: '#E25241',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
}

GalleryBottomNav.propTypes = {
  galleryPath: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GalleryBottomNav))
