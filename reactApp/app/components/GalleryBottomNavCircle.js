import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'


const Circle = props => (
  <View style={[styles.circle, {
    height: props.size,
    width: props.size,
    ...props.style,
  }]}
  />)

const GalleryBottomNavCircle = (props) => {
  if (!props.active) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => props.onGalleryNav(props.galleryId)}
        >
          <Circle size={9} />
          <Text style={[styles.text, {
            left: -10.5,
            top: 15,
          }]}
          >{props.galleryId.toString()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View >
      <TouchableOpacity
        onPress={() => props.onGalleryNav(props.galleryId)}
      >
        <View style={{
          borderColor: 'white',
          borderWidth: 1,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          borderRadius: 50,
        }}
        >
          <Circle size={13} />
        </View>
        <Text style={[styles.text, {
          top: 20,
          left: -5,
        }]}
        >{props.galleryId.toString()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {

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
  text: {
    width: 30,
    position: 'absolute',
    fontFamily: 'Arial',
    color: 'white',
    textAlign: 'center',
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

export default GalleryBottomNavCircle
