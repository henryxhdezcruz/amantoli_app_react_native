import React from 'react'
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

export default function RelatedProducts() {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:150,
        borderColor: "black",
        borderWidth: 5
    }
})
