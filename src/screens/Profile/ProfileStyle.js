import { Platform, StyleSheet } from "react-native";
import { Fonts, Colors } from "../../global";
import { OUTER_SPACE_70 } from "../../global/colors";

export const styles = StyleSheet.create({

    editprofilecontainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 20,
        marginTop: 25,
        borderRadius: 14,
        height: 64,
        width: 183,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    textWilliams: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 10
        // fontWeight: 'bold'
        , fontFamily: Fonts.BOLD,
        color: "#161616"
    },
    editImage: {
        alignSelf: 'center',
        alignItems: "center",
        paddingLeft: 40
    },
    editText: {
        fontSize: 16
        // fontWeight: 'bold'
        , color: Colors.PRIMARY
        , fontFamily: Fonts.BOLD,
        marginTop: Platform.OS == "android" ? -4 : 0
    },
    profileImage: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 100
    },

    ///////Orders
    orders: {
        flexDirection: 'row',
        marginTop: 20,
        // marginHorizontal: 20 
    },
    bagOrder: {
        paddingLeft: 50,
        alignSelf: 'center',
    },
    textOrders: {
        fontSize: 16,
        fontFamily: Fonts.BOLD
    },
    horizontalViewOrder: {
        height: 1,
        backgroundColor: 'gray',
        marginTop: 20,
    },

    ///// Addaddresses
    addresses: {
        flexDirection: 'row',
        marginTop: 23,
    },
    addressesIcon: {
        paddingLeft: 50,
        alignSelf: 'center',
    },
    textAddresses: {
        fontSize: 20,
    },
    horizontalViewOrder: {
        height: 1,
        backgroundColor: 'gray',
        marginTop: 20,
    },

    //// Offers
    Offers: {
        flexDirection: 'row',
        marginTop: 23,
    },
    offersIcon: {
        paddingLeft: 50,
        alignSelf: 'center',
    },
    textOffers: {
        fontSize: 20,
    },
    // horizontalViewOrder: {
    //     height: 1,
    //     backgroundColor: 'gray',
    //     marginTop: 20,
    // },
    horizontalViewOrder: {
        height: 1,
        backgroundColor: Colors.GRAY_LIGHT,
        marginTop: 15,
    },


    ///// Earning
    Earning: {
        flexDirection: 'row',
        marginTop: 23,
    },
    earningIcon: {
        paddingLeft: 50,
        alignSelf: 'center',
    },
    textEarning: {
        fontSize: 20,
    },
    horizontalViewOrder: {
        height: 1,
        backgroundColor: 'gray',
        marginTop: 20,
    },

    ////More
    more: {
        flexDirection: 'row',
        marginTop: 23,
    },
    moreIcon: {
        paddingLeft: 50,
        alignSelf: 'center',
    },
    textMore: {
        fontSize: 20,
    },
    horizontalViewOrder: {
        height: 1,
        backgroundColor: 'gray',
        marginTop: 20,
    },


    ///feedback
    feedback: {
        flexDirection: 'row',
        marginTop: 23,
    },
    feedbackIcon: {
        paddingLeft: 50,
        alignSelf: 'center',
    },
    textFeedback: {
        fontSize: 20,
    },
    horizontalViewOrder: {
        height: 1,
        backgroundColor: Colors.GRAY_LIGHT,
        marginTop: 15,
    },



    ////Logout
    logout: {
        flexDirection: 'row',
        marginTop: 23,
    },
    logoutIcon: {
        paddingLeft: 50,
        alignSelf: 'center',
    },
    textLogout: {
        fontSize: 20,
    },
    horizontalViewOrder: {
        height: 1,
        backgroundColor: 'gray',
        marginTop: 20,
    },





});