import React from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Platform, ScrollView, Alert } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, ScreenNames } from '../../global';
import { WHITE } from '../../global/colors';
import Addsvg from '../../assets/svg/menu/PlusQuantity'
import { styles } from './EditProfileStyle'
import ModalSelectMechnic from '../../components/ModalSelectMechanic/ModalSelectMechanic';
import DownSvg from '../../assets/svg/menu/Drop_DownIcon.svg'
import Header from '../../components/Header/Header'
import database from '@react-native-firebase/database'
import { connect } from 'react-redux';
import moment from 'moment';
import * as UserActions from '../../redux/actions/userActions'
const EditProfileScreen = ({ userId, navigation, route, params, dispatch, uid }) => {

    const [userName, setUserName] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [checkUserName, setCheckUserName] = React.useState(false);
    const [checkMobileNumber, setCheckMobileNumber] = React.useState(false);

    const PickUpAddressRef = React.useRef();
    const VehicleTypeRef = React.useRef();

    const checkIsEmptyUserName = () => {
        if (userName == '') {
            setCheckUserName(true)
        } else {
            setCheckUserName(false)
        }
    }
    const checkIsEmptyMobileNumber = () => {
        if (mobileNumber == '') {
            setCheckMobileNumber(true)
        } else {
            setCheckMobileNumber(false)
        }
    }


    const addRequest = () => {
        database().ref('MobileUsers').child(uid.toString()).update({
            userName: userName,
            mobileNumber: mobileNumber,
        })
        dispatch(UserActions.setName(userName))
        dispatch(UserActions.setPhone(mobileNumber))
        navigation.replace(ScreenNames.BOTTOM_TABS)
        return null;
    }

    const createRequest = () => {
        if (userName != '') {
            addRequest()
        } else {
            Alert.alert("Alert", "Please Enter all details")
        }
    }
    React.useEffect(() => {
        if (route.params.new == 1) {
            setMobileNumber(route.params.number)
        }
        database().ref('MobileUsers').once('value', messages => {
            if (!messages.exists()) {

            } else {
                database().ref('MobileUsers').once('value', element => {
                    if (!element.exists()) {
                        // console.warn(element);
                    } else {
                        let abc = Object.values(element.val())
                        let res = abc.filter(e => e.userId == userId)
                        if (res.length > 0) {
                            setMobileNumber(res[0].mobileNumber)
                            setUserName(res[0].userName)
                        }
                    }
                })
            }
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={true} isTopSpace={true} isTransparent={false} />
            <Header activateLeftIcon={true} name={"Edit Profile"} />
            <ScrollView>

                <TextInput
                    placeholder="Name"
                    maxFontSizeMultiplier={1}
                    ref={VehicleTypeRef}
                    onBlur={checkIsEmptyUserName}
                    style={{ ...styles.inputText, borderColor: checkUserName ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setUserName(text)}
                >
                    {userName}
                </TextInput>
                <TextInput
                    placeholder="Mobile Number"
                    ref={PickUpAddressRef}
                    onBlur={checkIsEmptyMobileNumber}
                    maxFontSizeMultiplier={1}
                    editable={false}
                    style={{ ...styles.inputText, borderColor: checkMobileNumber ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setMobileNumber(text)}
                >
                    {mobileNumber}
                </TextInput>
                {/* <TextInput
                    placeholder="Shop Name"
                    maxFontSizeMultiplier={1}
                    ref={VehicleNameRef}
                    onBlur={checkIsEmptyVehicleName}
                    style={{ ...styles.inputText, borderColor: checkVehicleName ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setVehicleName(text)}
                >
                    {vehicleName}
                </TextInput>
                <TextInput
                    placeholder="Shop Address"
                    maxFontSizeMultiplier={1}
                    ref={vehicleNumberRef}
                    onBlur={checkIsEmptyVehicleNumber}
                    style={{ ...styles.inputText, borderColor: checkVehicleNumber ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setVehicleNumber(text)}
                >
                    {vehicleNumber}
                </TextInput> */}

            </ScrollView>
            <TouchableOpacity
                style={{ ...styles.inputText, borderColor: Colors.PRIMARY, flexDirection: "row", justifyContent: "center", backgroundColor: Colors.PRIMARY, alignItems: "center" }}
                onPress={createRequest}>
                <Text
                    maxFontSizeMultiplier={1}
                    style={{ fontFamily: Fonts.BOLD, fontSize: 16, color: "#fff", marginTop: Platform.OS == 'android' ? -4 : 0 }}>
                    Update Profile
                </Text>
            </TouchableOpacity>
        </View>
    )
};
const mapStateToProps = state => ({
    userId: state.user.userId,
    uid: state.user.uid
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);