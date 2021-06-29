import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Modal, Platform, Keyboard, Alert, FlatList } from 'react-native'
import { styles } from './ModalSelectVehicalTypeStyle'
import Cancel from '../../assets/svg/menu/Cancel.svg'
import database from '@react-native-firebase/database'

const ModalSelectVehicleType = ({ vehicleTypeModalVisibility, toggleVehicleTypeModal, setSelectedVehicleType }) => {

    let vehicleTypes = [
        {
            "vehicleType": "Truck",
        },
        {
            "vehicleType": "4 weler",
        },
        {
            "vehicleType": "3 weler",
        },
        {
            "vehicleType": "4 weler",
        },
        {
            "vehicleType": "Bus",
        },
    ]
    return (

        <Modal
            statusBarTranslucent={true}
            transparent={true}
            visible={vehicleTypeModalVisibility}
            animationType="fade">
            <View style={styles.container1}>
                <View style={styles.modalcontainer}>

                    <View style={styles.modalbanner}>
                        <Text
                            maxFontSizeMultiplier={1}
                            style={styles.FontSelect}>Delivery Type</Text>
                        <TouchableOpacity onPress={() => toggleVehicleTypeModal()} style={styles.close}>
                            <Cancel />
                        </TouchableOpacity>
                    </View>

                    {
                        vehicleTypes.map((item, index) => {
                            return <TouchableOpacity
                                key={item.key}
                                onPress={() => {
                                    setSelectedVehicleType(item.vehicleType)
                                    toggleVehicleTypeModal()
                                }}
                                style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }} >

                                <Text
                                    maxFontSizeMultiplier={1}
                                    style={[styles.optionDetail, { marginLeft: 20 }]}>{item.vehicleType}</Text>

                            </TouchableOpacity>
                        }
                        )
                    }

                </View>
            </View>
        </Modal>
    )
}
export default ModalSelectVehicleType;