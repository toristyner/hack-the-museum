import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'


class Intro extends Component {
    state = { }
    render() {
      return (
        <View style={styles.viewContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading galleries...</Text>
        </View>
      )
    }
}

const styles = {
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default Intro
