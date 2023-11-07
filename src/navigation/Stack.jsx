import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../views/Home';
import WelcomeScreen from '../views/WelcomeScreen';
import {color} from '../constants/color';
import DetailScreen from '../views/DetailScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const STACK = createSharedElementStackNavigator();
// const STACK = createStackNavigator();
StatusBar.setBackgroundColor(color.WELCOME_BACKGROUND);
const Stack = () => {
  return (
    <STACK.Navigator
      screenOptions={{headerShown: false, animationEnabled: true}}>
      <STACK.Screen name="Welcome" component={WelcomeScreen} />
      <STACK.Screen name="Home" component={Home} />
      <STACK.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {strMealThumb} = route.params?.data?.item;
          return [strMealThumb];
        }}
      />
    </STACK.Navigator>
  );
};

export default Stack;

const styles = StyleSheet.create({});
