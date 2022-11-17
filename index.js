import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './Src/App';
import {name as appName} from './app.json';
import store from './Src/Redux/index';
import 'react-native-gesture-handler';

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
