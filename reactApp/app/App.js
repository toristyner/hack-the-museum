import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { NativeRouter, Route, Redirect, Switch } from 'react-router-native'
import reducer from './reducers/index'
import { GalleryBottomNav } from './components'
import sagas from './sagas'
import * as actions from './actionTypes'
import { Home, Detail, Profile, ArtImageViewer } from './screens/'

class App extends Component {
  constructor(props) {
    super(props)

    if (props.store === undefined) {
      const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })
      const sagaMiddleware = createSagaMiddleware()
      const middleware = [loggerMiddleware, sagaMiddleware]

      this.appStore = createStore(reducer, applyMiddleware(...middleware))
      // create the persistor
      this.persistor = persistStore(this.appStore)
      this.persistor.purge(() => console.log('purged'))
      sagaMiddleware.run(sagas)
    }
  }

  componentDidMount = () => this.initNativeServices()

  initNativeServices = () => this.appStore.dispatch({ type: actions.INIT_GALLERY_SERVICES })

  render() {
    const store = this.props.store !== undefined ? this.props.store : this.appStore
    const { profileComplete } = store.getState().musicProfile
    return (
      <Provider store={store}>
        <PersistGate persistor={this.persistor}>
          <NativeRouter>
            <View style={{ flex: 1, paddingTop: 20 }}>
              <Route
                exact
                path="/"
                render={() => <Redirect to={profileComplete ? '/home' : '/profile'} />}
              />
              <Route
                exact
                path="/recommendations"
                component={Home}
              />
              <Route
                exact
                path="/gallery/:galleryId"
                component={Home}
              />
              <Route
                exact
                path="/genre/:genreName"
                component={Home}
              />
              <Route
                exact
                path="/detail/:artId"
                component={Detail}
              />
              <Route
                exact
                path="/profile"
                component={Profile}
              />
              <Route
                exact
                path="/imageViewer"
                component={ArtImageViewer}
              />
              <Switch>
                <Route path="/imageViewer" />
                <Route path="/profile" />
                <Route component={GalleryBottomNav} />
              </Switch>
            </View>
          </NativeRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
