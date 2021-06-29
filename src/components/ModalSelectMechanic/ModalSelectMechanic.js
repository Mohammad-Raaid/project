import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Modal, Platform, Keyboard, Alert, FlatList } from 'react-native'
import { styles } from './ModalSelectMechanicStyle'
import Cancel from '../../assets/svg/menu/Cancel.svg'
import database from '@react-native-firebase/database'

const ModalSelectMechnic = ({ mechanicModalVisibility, toggleMechnicModal, setSelectedMechanic }) => {

    let mechanics = [
        {
            "mechanicId": 1,
            "mechanicName": "Abcd",
            "mechanicNunber": 1234567890
        },
        {
            "mechanicId": 2,
            "mechanicName": "Abcdef",
            "mechanicNunber": 1234567890
        },
        {
            "mechanicId": 3,
            "mechanicName": "Abcdefgh",
            "mechanicNunber": 1234567890
        },
        {
            "mechanicId": 4,
            "mechanicName": "Abcdefghijk",
            "mechanicNunber": 1234567890
        },
    ]
    const [allTowingList, setAllTowingList] = React.useState([])

    const getMechanics = () => {

        database().ref('MechnicUsers').on('value', messages => {
            if (!messages.exists()) {

            } else {
                database().ref('MechnicUsers').on('value', element => {
                    if (!element.exists()) {
                        // console.warn(element);
                    } else {
                        let abc = Object.values(element.val())
                        setAllTowingList(abc.sort(function (a, b) {
                            return new Date(b.time) - new Date(a.time)
                        }))
                    }
                })
            }
        })
    }
    return (

        <Modal
            statusBarTranslucent={true}
            transparent={true}
            onShow={getMechanics}
            visible={mechanicModalVisibility}
            animationType="fade">
            <View style={styles.container1}>
                <View style={styles.modalcontainer}>

                    <View style={styles.modalbanner}>
                        <Text
                            maxFontSizeMultiplier={1}
                            style={styles.FontSelect}>Delivery Type</Text>
                        <TouchableOpacity onPress={() => toggleMechnicModal()} style={styles.close}>
                            <Cancel />
                        </TouchableOpacity>
                    </View>

                    {
                        allTowingList.map((item, index) => {
                            return <TouchableOpacity
                                key={item.key}
                                onPress={() => {
                                    setSelectedMechanic(item)
                                    toggleMechnicModal()
                                }}
                                style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }} >

                                <Text
                                    maxFontSizeMultiplier={1}
                                    style={[styles.optionDetail, { marginLeft: 20 }]}>{item.mechanicName}</Text>

                            </TouchableOpacity>
                        }
                        )
                    }

                </View>
            </View>
        </Modal>
    )
}
export default ModalSelectMechnic;