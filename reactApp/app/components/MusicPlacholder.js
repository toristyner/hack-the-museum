import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { bloodOrange } from '../styles'

const MusicPlacholder = props => (
  <View style={myStyle.container}>
    <Icon
      color={bloodOrange}
      name="ios-musical-notes"
      size={120}
    />
    <Text style={myStyle.text}>
      No songs have been added yet...
    </Text>
    <Text style={myStyle.text}>
      Be the first to add one!
    </Text>
    <TouchableOpacity
      onPress={props.addSong}
      style={myStyle.buttonStyle}
    >
      <Text style={myStyle.buttonText}>
        Add A Song
      </Text>
    </TouchableOpacity>
  </View>
)

const myStyle = {
  container: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
  buttonStyle: {
    width: '47%',
    marginTop: 30,
    padding: 10,
    backgroundColor: bloodOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
}

MusicPlacholder.propTypes = {
  addSong: PropTypes.func.isRequired,
}

export default MusicPlacholder
