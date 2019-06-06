import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from './Login'
import Signup from './Signup'
import Wallet from './Wallet'
import Marketplace from './Marketplace'
import Settings from '../Settings'
import Profile from '../components/Profile'
import Creator from './Creator'
import { store } from '../config/configureStore'
import AuthLoadingScreen from './AuthLoadingScreen'

const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Signup: Signup
},{
  headerMode: "float",
  mode: "card",
  initialRouteName: store.getState().user.isLoggedIn ? "Profile" : "Login"
})

export const Tabs = createBottomTabNavigator({
    Profile: Profile,
    Creator: Creator,
    Wallet: Wallet,
    Marketplace: Marketplace,
    Settings: Settings,
  });

export const RootNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Tabs,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);