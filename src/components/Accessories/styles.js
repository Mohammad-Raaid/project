import { StyleSheet } from "react-native";
import { Fonts, Colors, Constants } from "../../global";

//global variables
const imageWidth = (Constants.SCREEN_WIDTH - 60) / 2;


export const styles = StyleSheet.create({
    container: {
        width: imageWidth,
        marginRight: 20,
        marginBottom: 20
    },
    imageContainer: {
        height: 180,
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    cartIconContainer: {
        position: 'absolute',
        right: 0,
        bottom: '25%',
        zIndex: 1,
        backgroundColor: Colors.PRIMARY,
        height: 34,
        width: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    cartIcon: {
        height: 34,
        width: 34,
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstChildContainer: {
        paddingTop: 10
    },
    fashionText: {
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_12,
        color: "#040404",
        paddingBottom: 5
    },
    productText: {
        fontFamily: Fonts.MEDIUM,
        fontSize: Fonts.SIZE_13,
        color: Fonts.BLACK,
        paddingBottom: 5
    },
    productAmount: {
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_13,
        color: Fonts.BLACK,
        paddingBottom: 5

    }
});