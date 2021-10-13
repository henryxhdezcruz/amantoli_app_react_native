import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native'
import logo from "../../assets/logo.png"
import AuthStack from "../navigation/AuthStack"
import { layoutStyle } from "../styles"

export default function Auth() {

    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            <AuthStack/>
            {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                
            </KeyboardAvoidingView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        marginBottom: 20
    }
});