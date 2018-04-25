import React, { Component } from 'react'
import {
  NativeModules,
  View,
} from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import sagas from './sagas'
import * as actions from './actionTypes'

import { Home } from './screens/'
import { GalleryLocationService } from './utils'

class App extends Component {
  
  constructor(props) {
    super(props)

    if (props.store === undefined) {
      
      const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })
      const sagaMiddleware = createSagaMiddleware()
      const middleware = [
        loggerMiddleware,
        sagaMiddleware
      ]

      this.appStore = createStore(
        reducer,
        applyMiddleware(...middleware)
      )

      sagaMiddleware.run(sagas)
      
    }
  }

  componentDidMount = () => this.initNativeServices()

  initNativeServices = () => this.appStore.dispatch({ type: actions.INIT_GALLERY_SERVICES })

  render() {
    const store = this.props.store !== undefined ? this.props.store : this.appStore
    return (<Provider store={store}>
      <View style={styles.container}>
        <Home />
      </View>
    </Provider>)
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#b042f4',
    margin: 10,
  },
  disabled: {
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
}

export default App