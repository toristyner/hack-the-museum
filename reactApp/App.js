/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {NativeModules} from 'react-native';
var { GalleryLocationManager, BackendService } = NativeModules

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentDidMount = () => {

    BackendService.registerDevice()
    GalleryLocationManager.requestPermissions()
    // Swift callback example
    // GalleryLocationManager.addEvent("One", "Two", 3, (res) => {
    //   console.log("RESPONSE FROM SWIFT", res)
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
          <TouchableOpacity
            onPress={() => GalleryLocationManager.startLocationRanging()}
            style={styles.button}
          >
            <Text style={styles.text}>Start Location Ranging in Swift</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#b042f4',
    margin: 10
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
});
