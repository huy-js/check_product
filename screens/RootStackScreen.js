import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SlashScreen';
import checkProduct from './CheckProduct';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="checkProduct" component={checkProduct} />
  </RootStack.Navigator>
);

export default RootStackScreen;
