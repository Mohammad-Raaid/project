import React from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts } from '../../global';
import { WHITE } from '../../global/colors';
import Addsvg from '../../assets/svg/menu/PlusQuantity'
import { styles } from './CreateTowingStyles'
import ModalSelectMechnic from '../../components/ModalSelectMechanic/ModalSelectMechanic';
import DownSvg from '../../assets/svg/menu/Drop_DownIcon.svg'
import Header from '../../components/Header/Header'
import database from '@react-native-firebase/database'
import { connect } from 'react-redux';
import moment from 'moment';
import ModalSelectVehicleType from '../../components/ModalSelectVehicleType/ModalSelectVehicleType';

const CreateTowingScreen = ({ userId, navigation, route, params, name }) => {

    const [selectedMechnic, setSelectedMechanic] = React.useState({
        "mechanicId": 0,
        "mobileNumber": "Select",
        "mechanicNumber": 0,
        "mechanicName": "Select Mechanic"
    })
    const [selectedVehicleType, setSelectedVehicleType] = React.useState("Select Vehicle Type")
    const [vehicleType, setVehicleType] = React.useState("");
    const [pickUpAddress, setPickUpAddress] = React.useState("");
    const [vehicleNumber, setVehicleNumber] = React.useState("");
    const [vehicleName, setVehicleName] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");

    const [checkVehicleType, setCheckVehicleType] = React.useState(false);
    const [checkPickUpAddress, setCheckPickUpAddress] = React.useState(false);
    const [checkVehicleName, setCheckVehicleName] = React.useState(false);
    const [checkVehicleNumber, setCheckVehicleNumber] = React.useState(false);
    const [checkMobileNumber, setCheckMobileNumber] = React.useState(false);
    const [checkEmailAddress, setCheckEmailAddress] = React.useState(false);
    const [mechanicModalVisibility, setMechanicModalVisibility] = React.useState(false)
    const [vehicleTypeModalVisibility, setVehicleTypeModalVisibility] = React.useState(false)

    const PickUpAddressRef = React.useRef();
    const VehicleTypeRef = React.useRef();
    const VehicleNameRef = React.useRef();
    const vehicleNumberRef = React.useRef();
    const MobileNumberRef = React.useRef();
    const EmailAddressRef = React.useRef();

    const toggleVehicleTypeModal = () => { setVehicleTypeModalVisibility(!vehicleTypeModalVisibility) }
    const toggleMechnicModal = () => { setMechanicModalVisibility(!mechanicModalVisibility) }

    const checkIsEmptyVehicleType = () => {
        if (vehicleType == '') {
            setCheckVehicleType(true)
        } else {
            setCheckVehicleType(false)
        }
    }
    const checkIsEmptyPickUpAddress = () => {
        if (pickUpAddress == '') {
            setCheckPickUpAddress(true)
        } else {
            setCheckPickUpAddress(false)
        }
    }
    const checkIsEmptyVehicleNumber = () => {
        if (vehicleNumber == '') {
            setCheckVehicleNumber(true)
        } else {
            setCheckVehicleNumber(false)
        }
    }
    const checkIsEmptyMobileNumber = () => {
        if (mobileNumber.length < 0) {
            setCheckMobileNumber(true)
        } else {
            setCheckMobileNumber(false)
        }
    }
    const checkIsEmptyEmailAddress = () => {
        if (emailAddress == '' || !emailAddress.includes('@')) {
            setCheckEmailAddress(true)
        } else {
            setCheckEmailAddress(false)
        }
    }
    const checkIsEmptyVehicleName = () => {
        if (vehicleName == '') {
            setCheckVehicleName(true)
        } else {
            setCheckVehicleName(false)
        }
    }

    console.warn(route.params.towingId);
    const addRequest = () => {
        database().ref('TowingList').push({
            "userId": userId,
            "towingId": route.params.towingId,
            'vehicleType': selectedVehicleType,
            "userName": name,
            'pickUpAddress': pickUpAddress,
            'mechanicName': selectedMechnic.mechanicName,
            'mechanicNumber': selectedMechnic.mobileNumber,
            'mechanicId': selectedMechnic.mechanicId,
            'vehicleNumber': vehicleNumber,
            'vehicleName': vehicleName,
            'mobileNumber': mobileNumber,
            "status": "Pending",
            'emailAddress': emailAddress,
            "date": moment(Date.now()).format('l'),
            "time": Date.now(),
        })
        navigation.pop()
        return null;
    }

    const createRequest = () => {
        addRequest()
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={true} isTopSpace={true} isTransparent={false} />
            <Header activateLeftIcon={true} name={"Request Towing"} />
            <ScrollView>

                <TouchableOpacity
                    style={{ ...styles.inputText, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                    onPress={toggleVehicleTypeModal}>
                    <Text
                        maxFontSizeMultiplier={1}
                        style={{ fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: Platform.OS == 'android' ? -4 : 0 }}>
                        {selectedVehicleType}
                    </Text>
                    <DownSvg />
                </TouchableOpacity>
                <TextInput
                    placeholder="Pick Up Address"
                    ref={PickUpAddressRef}
                    onBlur={checkIsEmptyPickUpAddress}
                    maxFontSizeMultiplier={1}
                    style={{ ...styles.inputText, borderColor: checkPickUpAddress ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setPickUpAddress(text)}
                >
                    {pickUpAddress}
                </TextInput>
                <TextInput
                    placeholder="Vehicle Name"
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
                    placeholder="Vehicle Number"
                    maxFontSizeMultiplier={1}
                    ref={vehicleNumberRef}
                    onBlur={checkIsEmptyVehicleNumber}
                    style={{ ...styles.inputText, borderColor: checkVehicleNumber ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setVehicleNumber(text)}
                >
                    {vehicleNumber}
                </TextInput>
                <TextInput
                    placeholder="Mobile Number"
                    ref={MobileNumberRef}
                    onBlur={checkIsEmptyMobileNumber}
                    maxFontSizeMultiplier={1}
                    maxLength={10}
                    keyboardType="number-pad"
                    style={{ ...styles.inputText, borderColor: checkMobileNumber ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setMobileNumber(text)}
                >
                    {mobileNumber}
                </TextInput>
                <TextInput
                    placeholder="Email Address"
                    ref={EmailAddressRef}
                    onBlur={checkIsEmptyEmailAddress}
                    maxFontSizeMultiplier={1}
                    style={{ ...styles.inputText, borderColor: checkEmailAddress ? "#FF000080" : "#444444", }}
                    placeholderTextColor={Fonts.BLACK}
                    onChangeText={text => setEmailAddress(text)}
                >
                    {emailAddress}
                </TextInput>
                <TouchableOpacity
                    style={{ ...styles.inputText, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                    onPress={toggleMechnicModal}>
                    <Text
                        maxFontSizeMultiplier={1}
                        style={{ fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: Platform.OS == 'android' ? -4 : 0 }}>
                        {selectedMechnic.mechanicName}
                    </Text>
                    <DownSvg />
                </TouchableOpacity>
            </ScrollView>
            <ModalSelectMechnic
                toggleMechnicModal={toggleMechnicModal}
                mechanicModalVisibility={mechanicModalVisibility}
                setSelectedMechanic={setSelectedMechanic}
            />
            <ModalSelectVehicleType
                toggleVehicleTypeModal={toggleVehicleTypeModal}
                vehicleTypeModalVisibility={vehicleTypeModalVisibility}
                setSelectedVehicleType={setSelectedVehicleType}
            />
            <TouchableOpacity
                style={{ ...styles.inputText, borderColor: Colors.PRIMARY, flexDirection: "row", justifyContent: "center", backgroundColor: Colors.PRIMARY, alignItems: "center" }}
                onPress={createRequest}>
                <Text
                    maxFontSizeMultiplier={1}
                    style={{ fontFamily: Fonts.BOLD, fontSize: 16, color: "#fff", marginTop: Platform.OS == 'android' ? -4 : 0 }}>
                    Send Request
                </Text>
            </TouchableOpacity>
        </View>
    )
};
const mapStateToProps = state => ({
    userId: state.user.userId,
    name: state.user.name
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CreateTowingScreen);