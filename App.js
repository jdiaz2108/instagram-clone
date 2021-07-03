import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'

const Stack = createStackNavigator()
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouterName="Landing">
				<Stack.Screen name="landing" component={LandingScreen} options={{ HeaderShown: false}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
