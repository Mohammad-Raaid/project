import React from 'react';
import { View, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, ScreenNames } from '../../global';
import { WHITE } from '../../global/colors';
import Addsvg from '../../assets/svg/menu/PlusQuantity'
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'
import Accessories from '../../components/Accessories/Accessories';

const AccessoriesListScreen = ({ navigation, userId }) => {

    const [allAccessoriesList, setAllAccessoriesList] = React.useState([])
    const renderItem = ({ item }) => {
        return (
            <Accessories item={item} />
        )
    }

    React.useEffect(() => {
        database().ref('AccessoriesList').on('value', messages => {
            if (!messages.exists()) {

            } else {
                database().ref('AccessoriesList').on('value', element => {
                    if (!element.exists()) {
                        // console.warn(element);
                    } else {
                        let abc = Object.values(element.val())
                        setAllAccessoriesList(abc.sort(function (a, b) {
                            return new Date(a.time) - new Date(b.time)
                        }))
                    }
                })
            }
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={true} isTopSpace={true} />
            <Header activateLeftIcon={true} name={"Accessories"} />
            <ScrollView>

                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}
                        data={allAccessoriesList}
                        numColumns={2}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccessoriesListScreen);