import React from 'react';
import { Alert, Animated, PermissionsAndroid, StyleSheet, Image } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Colors, Constants, Fonts, ScreenNames, Server } from '../global';
import { CommonActions } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';
import * as UserAction from '../redux/actions/userActions'
import database from '@react-native-firebase/database'

const SplashScreen = ({
	navigation,
	dispatch,
	contactId,
	uid
}) => {

	const resetStackAndGoToUser = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.INTRODUCTION, }],
	});
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});
	const resetStackAndGoToEditProfile = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.EDIT_PROFILE, params: { new: 0 } }],
	});

	const user = {
		userId: 1,
		userName: "Dummy User",
		email: "dummyuser@user.com",
		dob: "2000-10-30",
		anniversaryDate: "2000-02-29",
		phone: "9890001103"
	}


	const opacity = React.useRef(new Animated.Value(1)).current;

	const CheckAsync = async () => {
		const response = await AsyncStorage.getItem("userId")
		console.warn(response);
	}
	React.useEffect(() => {
		CheckAsync()
		onLoad()
	}, [])



	const onLoad = async (countryName) => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 2500,
			useNativeDriver: true
		}).start(async ({ finished }) => {
			if (finished) {
				const response = await AsyncStorage.getItem("userId")
				if (response === null) {
					navigation.dispatch(resetStackAndGoToUser)
				} else {
					database().ref('MobileUsers').once('value', messages => {
						if (!messages.exists()) {

						} else {
							database().ref('MobileUsers').once('value', element => {
								if (!element.exists()) {
									// console.warn(element);
								} else {
									let abc = Object.values(element.val())
									let res = abc.filter(e => e.userId == response)
									if (res.length > 0) {

										// if (!res[0].userName) {
										dispatch(UserAction.setName(res[0]?.userName))
										// }
										dispatch(UserAction.setPhone(res[0].mobileNumber))
										dispatch(UserAction.setUserUid(res[0].uid))
										dispatch(UserAction.setUserId(response));
										dispatch(UserAction.setSignedIn(true));
										if (res[0]?.userName != "") {
											navigation.dispatch(resetStackAndGoToHome)
										} else {
											navigation.dispatch(resetStackAndGoToEditProfile)
										}
									} else {
										navigation.dispatch(resetStackAndGoToEditProfile)
									}
								}
							})
						}
					})
				}
			}
		});
	};

	return (
		<Animated.View style={styles.container}>
			{/* <Svg width="100%" height="140" viewBox="0 0 375 120" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Path d="M115.5 120C260.475 120 378 4.71332 378 -137.5C378 -279.713 260.475 -395 115.5 -395C-29.4747 -395 -147 -279.713 -147 -137.5C-147 4.71332 -29.4747 120 115.5 120Z" fill="#FFEFB7" />
				<Path d="M262.5 101C407.475 101 525 -14.2867 525 -156.5C525 -298.713 407.475 -414 262.5 -414C117.525 -414 0 -298.713 0 -156.5C0 -14.2867 117.525 101 262.5 101Z" fill="#FFE488" />
				<Path d="M176.5 51C321.475 51 439 -64.2867 439 -206.5C439 -348.713 321.475 -464 176.5 -464C31.5253 -464 -86 -348.713 -86 -206.5C-86 -64.2867 31.5253 51 176.5 51Z" fill="#FDD54D" />
			</Svg> */}
			<View style={styles.align}>
				{/* <LogoSvg /> */}
				<View>

					<Image
						style={{ height: 100, width: 100 }}
						source={require('../../android/app/src/main/res/mipmap-hdpi/ic_launcher.png')}
					/>
				</View>
				{/* <Text style={styles.fontText}>TransportServices</Text> */}
			</View>
			{/* <Svg width="100%" height="74" viewBox="0 0 375 64" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Path d="M252.5 515C397.475 515 515 399.713 515 257.5C515 115.287 397.475 0 252.5 0C107.525 0 -10 115.287 -10 257.5C-10 399.713 107.525 515 252.5 515Z" fill="#FFEFB7" />
				<Path d="M102.5 515C247.475 515 365 399.713 365 257.5C365 115.287 247.475 0 102.5 0C-42.4747 0 -160 115.287 -160 257.5C-160 399.713 -42.4747 515 102.5 515Z" fill="#FFE488" />
				<Path d="M73.5 530C218.475 530 336 414.713 336 272.5C336 130.287 218.475 15 73.5 15C-71.4747 15 -189 130.287 -189 272.5C-189 414.713 -71.4747 530 73.5 530Z" fill="#FDD54D" />
			</Svg> */}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.PRIMARY
	},
	align: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	fontText: {
		fontSize: 45,
		marginTop: 20,
		// fontFamily: Fonts.BOLD,
		color: Colors.WHITE,
		textAlign: "center"
		// flexDirection: "column-reverse"
	},
});

// const mapStateToProps = state => ({
// 	state: state.user,
// 	contactId: state.brand.contactId,
// 	uid: state.user.uid
// });

const mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
export default connect(null, mapDispatchToProps)(SplashScreen);