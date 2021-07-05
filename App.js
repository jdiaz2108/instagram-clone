import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyCYQ8s1Xh2WRi_OyXOfQpn7hZgYjIEFE4k",
	authDomain: "instagram-clone-17210.firebaseapp.com",
	projectId: "instagram-clone-17210",
	storageBucket: "instagram-clone-17210.appspot.com",
	messagingSenderId: "703857369644",
	appId: "1:703857369644:web:83a3691ef9f65f334aa789",
	measurementId: "G-BY9J09L617"
}

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

if(firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'

const Stack = createStackNavigator()

export class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				this.setState({
					loggedIn: false,
					loaded: true,
				})
			} else {
				this.setState({
					loggedIn: true,
					loaded: true,
				})
			}
		})
	}
	render() {
		const { loggedIn, loaded } = this.state
		if (!loaded) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text>
						Loading
					</Text>
				</View>
			)
		}

		if (!loggedIn) {			
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouterName="Landing">
						<Stack.Screen name="landing" component={LandingScreen} options={{ HeaderShown: false}} />
						<Stack.Screen name="Register" component={RegisterScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			)
		}

		return (
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouterName="Main">
						<Stack.Screen name="Main" component={MainScreen} options={{ HeaderShown: false }} />
						<Stack.Screen name="Add" component={AddScreen} options={{ HeaderShown: false }} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	}
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
