import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { Colors, Constants, ScreenNames } from '../../global';
import styles from './HomeStyle'

const HomeScreen = (
	{
		navigation
	}
) => {

	//Variables

	//States

	//Refs

	//Functions

	//UseEffect

	//UI
	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header activateLeftIcon={false} name={"TransServe"} />
			<View style={{ flexDirection: 'row', marginTop: 50 }}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ScreenNames.TOWINGLISTSCREEN)} style={{ backgroundColor: Colors.WHITE, height: Constants.SCREEN_WIDTH / 2 - 15, width: Constants.SCREEN_WIDTH / 2 - 30, marginHorizontal: 20, borderRadius: 10, elevation: 4, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, }}>
					<Image
						style={{ height: 100, width: 100 }}
						source={require('../../assets/images/towing-vehicle.png')}
					/>
					<Text style={{ fontSize: 20, textAlign: 'center' }}>Vehical Towing</Text>

				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ScreenNames.MECHANICSLISTSCREEN)} style={{ backgroundColor: Colors.WHITE, height: Constants.SCREEN_WIDTH / 2 - 15, width: Constants.SCREEN_WIDTH / 2 - 30, marginRight: 20, borderRadius: 10, elevation: 4, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
					<Image
						style={{ height: 100, width: 100 }}
						source={require('../../assets/images/mechanic.png')}
					/>
					<Text style={{ fontSize: 20, textAlign: 'center' }}>
						Mechanics
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 25 }}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ScreenNames.ACCESSORIESLISTSCREEN)} style={{ backgroundColor: Colors.WHITE, height: Constants.SCREEN_WIDTH / 2 - 15, width: Constants.SCREEN_WIDTH / 2 - 30, marginHorizontal: 20, borderRadius: 10, elevation: 4, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, alignSelf: 'center' }}>
					<Image
						style={{ height: 100, width: 100 }}
						resizeMode="center"
						source={require('../../assets/images/shopping-cart.png')}
					/>
					<Text style={{ fontSize: 20, textAlign: 'center' }}>
						Accessories
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
};

export default HomeScreen;