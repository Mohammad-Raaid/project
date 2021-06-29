import { Colors, Constants, Fonts } from "../../global/index";

const { StyleSheet } = require("react-native");



export const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    headerLeftContainer: {
        flex: 1.1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor: Colors.PRIMARY
    },

    headerLeft: {
        marginHorizontal: 20,
        marginTop: 10

    },

    headerCenterContainer: {
        flex: 1,
        marginTop: 5,
        alignItems: "flex-start",
        // flex: 6,
        // backgroundColor: Colors.PRIMARY
    },

    headerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    headerRightContainer: {
        flex: 1.1,
        // backgroundColor: Colors.WHITE
    },

    headerRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-end",
        marginRight: 20,
    },

    headerText: {
        fontSize: Fonts.SIZE_22,
        fontFamily: Fonts.EXTRA_BOLD,
        color: Colors.WHITE,
        textAlign: "auto"
    }
});