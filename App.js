/* eslint-disable global-require */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  createStackNavigator,
  createAppContainer } from 'react-navigation';
import HomeScreen from './Screens/HomeScreen.js';
import NewPost from './Screens/NewPost.js';
import EditPost from './Screens/EditPost.js';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  NewPost: { screen: NewPost },
  EditPost: { screen: EditPost }
}, { headerMode: 'screen',
});

const Navigator = createAppContainer(MainNavigator);

export default Navigator;
