import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { getSearchHistoryApi } from '../../api/search';
import { map } from "lodash";
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import SearchHistoryItem from './SearchHistoryItem';

export default function SearchHistory(props) {

    const {showHistory, containerHeight, onSearch} = props;

    const [history, setHistory] = useState(null)

    useEffect(() => {
        if(showHistory) {
            (async () => {
                const response = await getSearchHistoryApi();
                setHistory(response);
            })()
        }
    }, [showHistory])
    

    if(showHistory){
        return (
            <ScrollView style={[styles.history,/*{ top: containerHeight }*/]} 
            >
                {history &&
                    map(history, (item, index) => (
                        <SearchHistoryItem item={item} key={index} onSearch={onSearch}></SearchHistoryItem>
                    ))}
            </ScrollView>
        )
    }
    return (
        <View></View>
    )
}

{/* <TouchableWithoutFeedback
                        key={index}
                        onPress={() => onSearch(item.search)}
                    >
                        <View style={styles.historyItem}>
                            <View style={styles.row}>
                                <AwesomeIcon name="history" size={16} />
                                <Text style={styles.text}>
                                    {item.search}
                                </Text>
                            </View>
                            <AwesomeIcon name="chevron-right" size={16} />
                        </View>
                    </TouchableWithoutFeedback> */}


const styles = StyleSheet.create({
    history:{
        zIndex: 3,
        backgroundColor: "white",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        left:-20,

        //position: "absolute",
    },
})