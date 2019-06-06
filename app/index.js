import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
// import Navigator from './containers/Navigator'
import { RootNavigation } from './containers/nav-new'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './config/configureStore'
import Reactotron from 'reactotron-react-native'
import { createAppContainer } from 'react-navigation';
import Modal from './containers/ModalContainer'

let Navigation = createAppContainer(RootNavigation);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          {/* <View style={{ flex: 1 }}> */}
            <Navigation />
            <Modal></Modal>
          {/* </View> */}
        </PersistGate>
      </Provider>
    );
  }
}

