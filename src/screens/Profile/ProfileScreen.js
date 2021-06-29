import React from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, ToastAndroid, FlatList, Platform, Alert, Linking, Clipboard, ScrollView } from 'react-native';

//my imports
import { styles } from './ProfileStyle';
import Header from '../../components/Header/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import { Colors, ScreenNames } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import * as UserAction from '../../redux/actions/userActions'

import TandC from "../../assets/svg/menu/Terms&ConditionsProfileIcon.svg";
import Privacy from "../../assets/svg/menu/PrivacyPolicy.svg";
import FAQ from "../../assets/svg/menu/FAQs.svg";
import Logout1 from "../../assets/svg/menu/Logout.svg";
const UserDetailScreen = ({
	navigation,
	dispatch,
	name
}) => {


	//Variables
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.LOGIN, }],
	});

	//States

	//Refs

	//Functions
	const Logout = async () => {
		await AsyncStorage.clear()
		navigation.dispatch(resetStackAndGoToHome)
		dispatch(UserAction.clearSession())
	}
	const profilename = [
		{
			name: "Terms and condition",
			svg: <TandC style={styles.logoutIcon} />

		}, {
			name: "Privacy Policy",
			svg: <Privacy style={styles.logoutIcon} />

		}
		,
		{
			name: "FAQs",
			svg: <FAQ style={styles.logoutIcon} />

		},
		{
			name: "Logout",
			svg: <Logout1 style={styles.logoutIcon} />

		}
	]
	const VenderLogout = async () => {
		Alert.alert(
			"Alert",
			"Are you sure you want to logout?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress: () => Logoutwork() }
			],
			{ cancelable: false }
		);
	}


	const Logoutwork = async () => {
		await AsyncStorage.clear()
		navigation.dispatch(resetStackAndGoToHome)
		dispatch(UserAction.clearSession())
	}
	//UseEffect

	//UI
	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			<FocusAwareStatusBar isLightBar={true} isTopSpace={true} isTransparent={false} color={Colors.PRIMARY} />

			{/* <Header activateLeftIcon={true} name={"Profile"} onpressEditProfile={() => navigation.navigate(ScreenNames.VENDEREDIT_PROFILE)} /> */}
			<Header name="Profile" size={20} activateLeftIcon={false} activateRightIcon={true} />

			<ScrollView showsVerticalScrollIndicator={false}>


				<View>
					<Text maxFontSizeMultiplier={1} style={styles.textWilliams}>{name}</Text>

					<View style={{ marginBottom: 20 }}>

						<FlatList data={profilename}
							renderItem={({ item, index }) => (
								<View style={{ flex: 1 }}>
									{
										index == 0 ?
											<View style={{ ...styles.horizontalViewOrder, backgroundColor: "#0000000D" }} />
											:
											null
									}

									<TouchableOpacity style={styles.orders} onPress={() => {

										item.name == "Terms and condition" ?
											Linking.openURL(`https://google.com`)
											:
											item.name == "Privacy Policy" ?
												Linking.openURL(`https://google.com`)
												:
												item.name == "FAQs" ?
													Linking.openURL(`https://google.com`)
													:
													item.name = "Logout"
														?
														VenderLogout(item)
														:
														null
									}}>
										{item.svg}
										<Text maxFontSizeMultiplier={1} style={styles.textOrders} >{item.name}</Text>
									</TouchableOpacity>
									{
										index == profilename.length - 1 ?
											null :

											<View style={[styles.horizontalViewOrder, { backgroundColor: "#0000000D" }]} />
									}
								</View>

							)} />
					</View>
				</View>
			</ScrollView>

		</View>
	);
}

const mapStateToProps = state => ({
	uid: state.user.uid,
	userId: state.user.userId,
	name: state.user.name
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);
