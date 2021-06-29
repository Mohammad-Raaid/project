import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, ScreenNames } from '../../global';
import OTPTextInput from 'react-native-otp-textinput';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './OTPStyles'
import { connect } from 'react-redux';
import * as UserAction from '../../redux/actions/userActions'
import AsyncStorage from '@react-native-community/async-storage';
import auth, { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import moment from 'moment';

const OTPScreen = ({ navigation, route, params, dispatch }, props) => {

	//Variables
	const user = {
		userId: 1,
		userName: "Dummy User",
		email: "dummyuser@user.com",
		dob: "2000-10-30",
		anniversaryDate: "2000-02-29",
		phone: route.params.phone
	}

	//States
	const otpInput = React.useRef(null);
	const [code, setCode] = React.useState('023405');
	const [minutes, setMinutes] = React.useState(1);
	const [timerValue, setTimerValue] = React.useState(30);
	const [resend, setResend] = React.useState(false);
	const [firebaseResponse, setFirebaseResponse] = React.useState(null);
	const [mobileUsers, setMobileUsers] = React.useState([]);

	//useRef
	const timerRef = React.useRef();

	//Functions
	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setTimerValue(prevTimerValue => prevTimerValue - 1);
		}, 1000);
	};

	const resendOtp = () => {
		setMinutes(1)
		setTimerValue(30)
		startTimer()
		setResend(false)
		return () => {
			clearInterval(timerRef.current);
		};
	}

	const verifyOtp = async () => {
		try {
			const resp = await firebaseResponse.confirm(code.toString());
			const uid = resp.user._user.uid;
			const phoneNumber = resp.user._user.phoneNumber;

			checkPhoneNumberExists(uid, phoneNumber);

		} catch (error) {
			console.log("doVerification-Error", '\n', error.response);
			Alert.alert('Warning!', error.message);
		}
		// if (code === "123456") {
		// 	dispatch(UserAction.setUserId(user.userId));
		// 	dispatch(UserAction.setAnniversaryDate(user.anniversaryDate));
		// 	dispatch(UserAction.setDob(user.dob));
		// 	dispatch(UserAction.setEmail(user.email));
		// 	dispatch(UserAction.setName(user.userName));
		// 	dispatch(UserAction.setPhone(user.phone));
		// 	dispatch(UserAction.setSignedIn(true));
		// 	navigation.replace(ScreenNames.BOTTOM_TABS)
		// 	await AsyncStorage.setItem('userId', user.userId.toString());
		// } else {
		// 	alert("aokndwo")
		// }
	}
	const addUser = async (uid, phoneNumber) => {
		database().ref('MobileUsers').child(uid).set({
			userId: mobileUsers.length > 0 ? mobileUsers[0].userId + 1 : 1,
			uid: uid,
			unSeenCount: 0,
			userName: "",
			mobileNumber: phoneNumber,
			"date": moment(Date.now()).format('l'),
			"time": Date.now(),
		})
		dispatch(UserAction.setUserId(mobileUsers.length > 0 ? mobileUsers[0].userId + 1 : 1));
		await AsyncStorage.setItem('userId', mobileUsers.length > 0 ? (mobileUsers[0].userId + 1).toString() : "1");
		dispatch(UserAction.setUserUid(uid))
		dispatch(UserAction.setSignedIn(true));
		navigation.replace(ScreenNames.EDIT_PROFILE, { new: 1, number: phoneNumber })
		return null;
	}

	const checkPhoneNumberExists = async (uid, phoneNumber) => {
		const result = mobileUsers.filter(e => e.uid == uid)
		if (result.length == 0) {
			database().ref('MobileUsers').child(uid).once('value', (Users) => {
				// console.warn("Users.exists()", Users.exists());
				if (!Users.exists()) {
					// console.warn("hii");
					// setFlag(false)
					addUser(uid, phoneNumber)
				} else {
					const User = Users.forEach(element => {
						if (uid === element.val().uid) {
							return true
						}
					});
					if (!User) {
						addUser(uid, phoneNumber)
					}
					// if (flag == false) {
					//     console.warn("flag", flag);
					// }
				}
			})
		} else {
			const res = mobileUsers.filter(e => e.uid == uid)
			dispatch(UserAction.setUserId(res[0].userId));
			dispatch(UserAction.setName(res[0].userName));
			await AsyncStorage.setItem('userId', res[0].userId.toString());
			dispatch(UserAction.setUserUid(uid))
			dispatch(UserAction.setSignedIn(true));
			if (res[0].userName == "") {
				navigation.replace(ScreenNames.EDIT_PROFILE, { new: 0 })
			} else[
				navigation.replace(ScreenNames.BOTTOM_TABS)
			]

		}
	}

	const doAuth = async () => {
		try {
			const resp = await auth().signInWithPhoneNumber(route.params.number);
			setFirebaseResponse(resp)
		} catch (error) {
			console.log("doPhoneAuthentication-Error", '\n', error.message);
			Alert.alert('Warning!', error.message);
		}
	}

	//UseEffect
	React.useEffect(() => {
		startTimer()
		database().ref('MobileUsers').once('value', messages => {
			if (!messages.exists()) {

			} else {
				database().ref('MobileUsers').once('value', element => {
					if (!element.exists()) {
						// console.warn(element);
					} else {
						let abc = Object.values(element.val())
						setMobileUsers(abc.sort(function (a, b) {
							return new Date(b.time) - new Date(a.time)
						}))
					}
				})
			}
		})
		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	React.useEffect(() => {
		doAuth()
	}, [])
	React.useEffect(() => {

		if (timerValue === 0) {
			if (minutes > 0) {
				setTimerValue(59)
				setMinutes(0)
			} else {
				setResend(true)
				clearInterval(timerRef.current);
			}
		}
	}, [timerValue]);


	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<ScrollView keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "handled"}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Verifying  {'\n'}your number
					</Text>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000090", marginTop: 20 }}>
						We’ve sent your verification code to  +91 {route.params.number}
					</Text>
					<View style={{ alignItems: "center", marginTop: Platform.OS === 'android' ? 70 : 0, paddingBottom: 30, }}>
						<Text style={{ position: "absolute", left: 0, bottom: Platform.OS === 'android' ? 85 : 160, fontFamily: Fonts.MEDIUM, fontSize: 16, color: "#00000080" }}>
							Enter Code
						</Text>
						{
							Platform.OS === 'android'
								?
								<OTPTextInput
									handleTextChange={(item) => {
										setCode(item)
										if (item.length == 6) {
											Keyboard.dismiss();
										}
									}}
									ref={otpInput}
									inputCount={6}
									tintColor={Colors.PRIMARY}
									offTintColor={'#000000'}
									containerStyle={{
									}}
									textInputStyle={[styles.subtitle, {
										borderRadius: 5,
										borderColor: Colors.BLACK,
										borderWidth: 1,
										borderBottomWidth: 1,
										height: 40,
										width: 35,
									}]} />
								:
								<OTPInputView
									style={{ width: '80%', height: 200 }}
									pinCount={6}
									ref={otpInput}
									// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
									onCodeChanged={code => {
										setCode(code)
									}}
									autoFocusOnLoad={false}
									codeInputFieldStyle={styles.underlineStyleBase}
									codeInputHighlightStyle={styles.underlineStyleHighLighted}
									onCodeFilled={(code => {
										setCode(code)
										console.log(`Code is ${code}, you are good to go!`)
									})}
								/>
						}
						{
							resend
								?
								<TouchableOpacity style={{ fontFamily: Fonts.MEDIUM, color: "#000000", position: "absolute", right: 0, bottom: Platform.OS === 'android' ? 5 : 70 }} onPress={resendOtp}><Text>Resend code</Text></TouchableOpacity>
								: <Text style={{ fontFamily: Fonts.MEDIUM, color: "#00000080", position: "absolute", right: 0, bottom: Platform.OS === 'android' ? 5 : 70 }}>{minutes}:{timerValue} min left</Text>

						}
					</View>
				</View>
			</ScrollView>
			<View style={{ justifyContent: "flex-end" }}>
				<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, borderRadius: 50 }} onPress={verifyOtp}>
					<Text style={globalStyles.buttonText}>
						Verify
					</Text>
				</TouchableOpacity>
				{/* <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
					<Text style={{ color: "#16161680" }}>
						Don’t have a account?
					</Text>
					<TouchableOpacity style={{ paddingLeft: 5 }}>
						<Text style={{ color: "#161616" }}>
							Sign up
						</Text>
					</TouchableOpacity>
				</View> */}
			</View>
		</KeyboardAvoidingView >
	)
};
// const mapStateToProps = (state) => {
// 	return {
// 		contactId: state.brand.contactId,
// 		country: state.brand.country,
// 		brandId: state.brand.brandId,
// 		brandInterest: state.brand.brandInterest,
// 		currentUserType: state.user.currentUserType,

// 	};
// };

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(null, mapDispatchToProps)(OTPScreen);