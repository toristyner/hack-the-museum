import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import GalleryBottomNavCircle from './GalleryBottomNavCircle'
import { bloodOrange, galleryBottomNavHeight } from '../styles'

const { width } = Dimensions.get('window')

const numOfPastGalleriesToDisplay = 5
const widthOfProfileContainer = 50
const horizontalPaddingOfNavContainer = 15
const widthOfEachLineBetweenNavButtons =
  (width - widthOfProfileContainer - horizontalPaddingOfNavContainer) / numOfPastGalleriesToDisplay

class GalleryBottomNav extends Component {
    static propTypes = {
      history: PropTypes.func.isRequired,
    }

    onGalleryNav = (galleryId) => {
      this.props.history.replace(`/gallery/${galleryId}`)
    }

    onProfileButtonPress = () => {
      this.props.history.replace('/recommendations')
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

export default connect(mapStateToProps)(GalleryBottomNav)
