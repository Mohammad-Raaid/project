import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './LoginStyle'
import { ScreenNames } from '../../global/index';

const LoginScreen = ({ navigation }) => {

	//Variables

	//States
	const [number, setNumber] = React.useState('')

	//Refs

	//Functions
	const Login = () => {
		navigation.navigate(ScreenNames.OTP, { number: "+91" + number })
	}

	//UseEffect

	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<ScrollView keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "handled"} style={{}}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Welcome {'\n'}Login
					</Text>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000070", marginTop: 20 }}>
						Enter Your Phone Number and we will send SMS with confirmation code to your number
					</Text>
					<View style={{ flexDirection: "row", marginTop: 40 }}>
						<Text style={{ borderRadius: 5, borderWidth: 1, padding: 15, fontFamily: Fonts.MEDIUM, fontSize: 18 }}>
							+91
						</Text>
						<TextInput
							placeholder="Enter number"
							maxLength={10}
							onBlur={() => Keyboard.dismiss()}
							keyboardType="phone-pad"
							style={{ ...styles.textinput, flex: 1 }}
							placeholderTextColor={Fonts.BLACK}
							onChangeText={text => setNumber(text)}
						/>
					</View>
				</View>
			</ScrollView>
			<View style={{ justifyContent: "flex-end" }}>
				<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, borderRadius: 50 }} onPress={Login}>
					<Text style={globalStyles.buttonText}>
						Sign in
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)
};

export default LoginScreen;