import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from '../../styles/colors';

export default function SearchHistoryItem(props) {

    const {item, onSearch} = props;

    return (
        <TouchableWithoutFeedback
            onPress={() => onSearch(item.search)}
        >
            <View style={styles.historyItem}>
                <View style={styles.row}>
                    <AwesomeIcon color="#A3A3A3" name="history" size={16} />
                    <Text style={styles.text}>
                        {item.search}
                    </Text>
                </View>
                <AwesomeIcon color="#3F3F46" name="chevron-right" size={16} />
            </View>
        </TouchableWithoutFeedback> 
    )
}

const styles = StyleSheet.create({
    hidden:{
        display: "none"
    },
    history:{
        position: "absolute",
        //zIndex: 3,
        backgroundColor: "white",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height 
    },
    historyItem:{
        paddingVertical: 15,
        paddingHorizontal: 20,
        /*borderWidth: 0.2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,*/
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5
    },
    text:{
        color: "#A3A3A3",
        fontSize: 15,
        marginLeft: 15
        //fontWeight: "bold"
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
    }
})