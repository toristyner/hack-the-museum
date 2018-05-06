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
            <View style={{ flex: 1, paddingTop: 30 }}>
              <Route
                exact
                path="/"
                render={() => <Redirect to={profileComplete ? '/home' : '/profile'} />}
              />
              <Route
                exact
                path="/home"
                render={props => <Home history={props.history} />}
              />
              <Route
                exact
                path="/detail"
                component={props => <Detail history={props.history} />}
              />
              <Route
                exact
                path="/profile"
                component={props => <Profile history={props.history} />}
              />
              <Route
                exact
                path="/imageViewer"
                component={props => <ArtImageViewer history={props.history} />}
              />
              <Switch>
                <Route path="/imageViewer" />
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
