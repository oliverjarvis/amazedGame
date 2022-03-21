import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import TabOneScreen from '../screens/MainMenu';
import GameScreen from '../screens/GameScreen';
import LinkingConfiguration from './LinkingConfiguration';
import LevelSelector from '../screens/LevelSelector';
import Credits from '../screens/Credits';
import LevelScore from '../screens/LevelScore';
import { StatusBar } from 'expo-status-bar';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DefaultTheme : DarkTheme}>
      <RootNavigator />
      <StatusBar hidden />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Main Menu'>
      <Stack.Screen name="Main Menu" component={TabOneScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="LevelSelector" component={LevelSelector} options={{ headerShown: false }} />
      <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Credits" component={Credits} options={{ headerShown: false }} />
      <Stack.Screen name="Level Score" component={LevelScore} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}