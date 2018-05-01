import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { galleryBottomNavHeight } from '../styles'
import Icon from 'react-native-vector-icons/Ionicons'

const bloodOrange = '#E25241'

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
    state = {
      historyItems: [{ id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }, { id: 106 }],
    }
    render() {
      return (
        <View
          style={styles.bottomNavContainer}
        >
          <View style={styles.historyContainer}>
            {
              this.state.historyItems.map(item => (
                <View
                  key={item.id}
                  style={{ flex: 1, alignItems: 'center' }}
                >
                  <Circle size={9} />
                  <Text style={styles.text}>{item.id.toString()}</Text>
                </View>
              ))
            }
          </View>
          <View style={styles.activeContainer}>
            <Text style={[styles.text, { fontSize: 12 }]}>
            Active
            </Text>
            <Text style={[styles.textShadow, { fontSize: 20 }]}>
              {this.props.activeGalleryId.toString()}
            </Text>
          </View>
        </View>
      )
    }
}

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

export default GalleryBottomNav
