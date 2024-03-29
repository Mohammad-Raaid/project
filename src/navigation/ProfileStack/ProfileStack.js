import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import EditProfileScreen from '../../screens/EditProfile/EditProfileScreen';

//my imports

//screens imports
import LoginScreen from '../../screens/Login/LoginScreen';
import OTPScreen from '../../screens/OTP/OTPScreen';
import { connect } from 'react-redux';
import ProfileScreen from '../../screens/Profile/ProfileScreen';

enableScreens();
const stack = createNativeStackNavigator();

const ProfileStack = ({
	isSignedIn
}) => {

	// const initialScreenName = isSignedIn ? ScreenNames.PROFILE : ScreenNames.SIGN_IN;
	const initialScreenName = isSignedIn ? ScreenNames.PROFILE : ScreenNames.SIGN_IN;

	return (
		<stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName={initialScreenName}	>

			<stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
			<stack.Screen name={ScreenNames.OTP} component={OTPScreen} />
			<stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
			<stack.Screen name={ScreenNames.EDIT_PROFILE} component={EditProfileScreen} />

		</stack.Navigator>
	);
};

const mapStateToProps = state => ({
	isSignedIn: state.user.isSignedIn,
});

export default connect(mapStateToProps, null)(ProfileStack);
