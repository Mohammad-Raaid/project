import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
	userId: null,
	name: "",
	email: "",
	phNo: "",
	gender: null,
	dob: null,
	anniversaryDate: null,
	token: null,
	referralCode: "",
	referredByReferralCode: null,
	isSignedIn: false,
	uid: ""
};

const user = (state = initialState, action) => {

	const { type, payload } = action;

	switch (type) {
		case actionTypes.SET_USER:
			return {
				...state,
				userId: payload,
			};
		case actionTypes.SET_UID:
			return {
				...state,
				uid: payload,
			};
		case actionTypes.SET_IS_SIGNIN:
			return {
				...state,
				isSignedIn: payload,
			};
		case actionTypes.SET_NAME:
			return {
				...state,
				name: payload,
			};
		case actionTypes.SET_EMAIL:
			return {
				...state,
				email: payload,
			};
		case actionTypes.SET_PHONE_NUMBER:
			return {
				...state,
				phNo: payload,
			};
		case actionTypes.SET_ANNIVERSARY_DATE:
			return {
				...state,
				dob: payload,
			};
		case actionTypes.SET_DOB:
			return {
				...state,
				anniversaryDate: payload,
			};
		case actionTypes.CLEAR_SESSION:
			return {
				isSignedIn: false,
				uid: "",
				userId: null
			};
		default:
			return state;
	}
};

export default user;