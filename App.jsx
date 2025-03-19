import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './src/Navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './src/Redux/Store/Store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

if (__DEV__) {
  require('./ReactotronConfig');
}
const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Provider store={store}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
