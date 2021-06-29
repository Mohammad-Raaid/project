import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, ScreenNames } from '../../global';
import { WHITE } from '../../global/colors';
import Addsvg from '../../assets/svg/menu/PlusQuantity'
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'

const TowingListScreen = ({ navigation, userId }) => {

    const [towingList, setTowingList] = React.useState([])
    const [allTowingList, setAllTowingList] = React.useState([])
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={1} style={{ backgroundColor: Colors.WHITE, justifyContent: "space-between", flexDirection: "row", elevation: 7, borderWidth: 10, borderColor: Colors.WHITE, marginTop: 10, marginBottom: 10, marginHorizontal: 10 }}>
                <View style={{ backgroundColor: Colors.WHITE, marginHorizontal: 10, }}>
                    <Text>
                        Booking id {item.towingId}
                    </Text>
                    <Text>
                        Mechanic Name {item.mechanicName}
                    </Text>
                    <Text onPress={() => Linking.openURL(`tel:${item.mechanicNumber}`)}>
                        Mechanic Number {item.mechanicNumber}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", marginRight: 10, alignItems: "center" }}>
                    <View style={{ backgroundColor: item.status == "Pending" ? "red" : item.status == "Accepted" ? "green" : item.status == "On the Way" ? "yellow" : "green", height: 10, width: 10, borderRadius: 10, }}>
                    </View>
                    <Text style={{ textAlign: "right", alignItems: "center", marginLeft: 5 }}>
                        {item.status}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    React.useEffect(() => {
        database().ref('TowingList').on('value', messages => {
            if (!messages.exists()) {

            } else {
                database().ref('TowingList').on('value', element => {
                    if (!element.exists()) {
                        // console.warn(element);
                    } else {
                        let abc = Object.values(element.val())
                        const response = abc.filter(e => e.userId == userId)
                        setTowingList(response.sort(function (a, b) {
                            return new Date(b.time) - new Date(a.time)
                        }))
                        setAllTowingList(abc.sort(function (a, b) {
                            return new Date(b.time) - new Date(a.time)
                        }))
                    }
                })
            }
        })
    }, [])
    const GoToCreate = () => {
        navigation.navigate(ScreenNames.CREATETOWINGCREEN, { towingId: allTowingList.length == 0 ? 1 : allTowingList[0].towingId + 1 })
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header activateLeftIcon={true} name={"Towing Requested"} />
            <ScrollView>

                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ flex: 1 }}
                        data={towingList}
                        renderItem={renderItem}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity onPress={GoToCreate} activeOpacity={0.5} style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.WHITE, elevation: 4, position: "absolute", alignItems: "center", justifyContent: "center", bottom: 50, right: 50 }}>
                <Addsvg />
            </TouchableOpacity>
        </View>
    )
};
const mapStateToProps = state => ({
    userId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TowingListScreen);