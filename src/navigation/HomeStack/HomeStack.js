import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
//screens imports
import HomeScreen from '../../screens/Home/HomeScreen';
import TowingListScreen from '../../screens/TowingList/TowingListScreen';
import CreateTowingScreen from '../../screens/CreateTowing/CreateTowingScreen';
import AccessoriesListScreen from '../../screens/AccessoriesList/AccessoriesListScreen';
import MechanicsListScreen from '../../screens/MechanicsList/MechanicsListScreen';


enableScreens();
const stack = createNativeStackNavigator();
const HomeStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.HOME}
		>
			<stack.Screen
				name={ScreenNames.HOME}
				component={HomeScreen} />
			<stack.Screen
				name={ScreenNames.TOWINGLISTSCREEN}
				component={TowingListScreen} />
			<stack.Screen
				name={ScreenNames.CREATETOWINGCREEN}
				component={CreateTowingScreen} />
			<stack.Screen
				name={ScreenNames.ACCESSORIESLISTSCREEN}
				component={AccessoriesListScreen} />
			<stack.Screen
				name={ScreenNames.MECHANICSLISTSCREEN}
				component={MechanicsListScreen} />

		</stack.Navigator>
	);
};
export default HomeStack;