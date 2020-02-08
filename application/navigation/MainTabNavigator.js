import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import TabBarIcon from '../components/TabBarIcon';
import Swipe from '../screens/Swipe';
import MessagesScreen from '../screens/Messages';
import Map from '../screens/Map';
import UserSettings from '../screens/UserSettings';
import { Ionicons } from '@expo/vector-icons';
const App = createBottomTabNavigator(
	{
		Explore: {
			screen: Map,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}>&#xf50d;</Text>
					);
				}
			}
		},
		Swipe: {
			screen: Swipe,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}><Ionicons name="ios-swap" size={20} /></Text>
					);
				}
			}
		},
		Chat: {
			screen: MessagesScreen,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}>&#xf4ac;</Text>
					);
				}
			}
		},
		Settings: {
			screen: UserSettings,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}>&#xf061;</Text>
					);
				}
			}
		}
	},
	{
		tabBarOptions: {
			activeTintColor: '#7444C0',
			inactiveTintColor: '#363636',
			labelStyle: {
				fontSize: 14,
				textTransform: 'uppercase',
				paddingTop: 10
			},
			style: {
				backgroundColor: '#FFF',
				borderTopWidth: 0,
				paddingVertical: 10,
				height: 70,
				marginBottom: 0,
				shadowOpacity: 0.05,
				shadowRadius: 10,
				shadowColor: '#000',
				shadowOffset: { height: 0, width: 0 }
			}
		}
	}
);

const styles = StyleSheet.create({
	tabButton: {
		paddingTop: 20,
		paddingBottom: 30,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	tabButtonText: {
		textTransform: 'uppercase'
	},
	icon: {
		fontFamily: 'tinderclone',
		height: 20,
		paddingBottom: 0
	}
});
export default App;
