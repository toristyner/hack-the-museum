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
          onPress={() => this.onGalleryNav(props.galleryId)}
        >
          <Circle size={9} />
        </TouchableOpacity>
        <Text style={styles.text}>{props.galleryId.toString()}</Text>
      </View>
    )
  }
  return (
    <View >
      <TouchableOpacity
        onPress={() => this.onGalleryNav(props.galleryId)}
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
      </TouchableOpacity>
      <Text style={styles.text}>{props.galleryId.toString()}</Text>
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
    left: -5,
    top: 10,
    position: 'absolute',
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

export default GalleryBottomNavCircle
