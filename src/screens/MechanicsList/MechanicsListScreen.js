import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, ScreenNames } from '../../global';
import { WHITE } from '../../global/colors';
import Addsvg from '../../assets/svg/menu/PlusQuantity'
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'

const MechanicsListScreen = ({ navigation, userId }) => {

    const [allTowingList, setAllTowingList] = React.useState([])
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={1} style={{ backgroundColor: Colors.WHITE, justifyContent: "space-between", flexDirection: "row", elevation: 7, borderWidth: 10, borderColor: Colors.WHITE, marginTop: 10, marginBottom: 10, marginHorizontal: 10 }}>
                <View style={{ backgroundColor: Colors.WHITE, marginHorizontal: 10, }}>
                    <Text>
                        Mechanic Name: {item.mechanicName}
                    </Text>
                    <Text
                        onPress={() => Linking.openURL(`tel:${item.mobileNumber}`)}>
                        Mechanic Number: {item.mobileNumber}
                    </Text>
                    <Text>
                        Shop Name: {item.shopName}
                    </Text>
                    <Text>
                        Shop Address: {item.shopAddress}
                    </Text>
                </View>
                {/* <View style={{ flexDirection: "row", marginRight: 10, alignItems: "center" }}>
                    <View style={{ backgroundColor: "red", height: 10, width: 10, borderRadius: 10, }}>
                    </View>
                    <Text style={{ textAlign: "right", alignItems: "center", marginLeft: 5 }}>
                        {item.status}
                    </Text>
                </View> */}
            </TouchableOpacity>
        )
    }

    React.useEffect(() => {
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
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header activateLeftIcon={true} name={"Mechanics"} />
            <ScrollView>

                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ flex: 1 }}
                        data={allTowingList}
                        renderItem={renderItem}
                    />
                </View>
            </ScrollView>
        </View>
    )
};
const mapStateToProps = state => ({
    userId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MechanicsListScreen);