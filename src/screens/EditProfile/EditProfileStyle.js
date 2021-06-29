import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    inputText: {
        height: 45,
        width: Constants.SCREEN_WIDTH - 40,
        borderRadius: 7,
        borderWidth: 2,
        paddingHorizontal: 20,
        marginLeft: 20,
        fontFamily: Fonts.BOLD,
        fontSize: 14,
        color: "#161616",
        marginVertical: 13
    }
})