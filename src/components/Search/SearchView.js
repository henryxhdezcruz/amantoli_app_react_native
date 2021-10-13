import React ,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, Keyboard, Animated } from 'react-native'
import { Searchbar } from "react-native-paper"
import { useNavigation, useRoute } from '@react-navigation/native'
import { updateSearchHistoryApi } from '../../api/search'
import SearchHistory from './SearchHistory'
import colors from "../../styles/colors"
import { Icon } from 'react-native-elements'

export default function SearchView(props) {

    const { currentSearch } = props;

    const [searchQuery, setSearchQuery] = useState(currentSearch || "");

    const navigation = useNavigation();
    const route = useRoute ();

    const onChangeSearch = (query) => setSearchQuery(query);

    const closeSearch = () => {
        //animatedTransitionReset.start();
        Keyboard.dismiss();
        navigation.goBack();
        //setShowHistory(false);
    }

    const onSearch = async (reuseSearch) => {
        const isReuse = typeof reuseSearch === "string";
        closeSearch();
        !isReuse && (await updateSearchHistoryApi(searchQuery));
        
        if(route.name === "search-view") {
            navigation.push("search",{
                search: isReuse ? reuseSearch : searchQuery,
            });
        } else {
            navigation.navigate("search-view",{
                search: isReuse ? reuseSearch : searchQuery,
            });
        }
        
    }

    return (
        <View>
            <View 
                style={styles.container} 
            >
                <View style={{flexDirection: "row"}}>
                    <View style={styles.containerBars}>
                        <Icon
                            name='arrow-left'
                            type='font-awesome'
                            color="white"
                            onPress={closeSearch}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Searchbar 
                            placeholder="Buscar un producto"
                            value={searchQuery}
                            // onFocus={openSearch}
                            onChangeText={onChangeSearch}
                            onSubmitEditing={onSearch}
                        />
                    </View>
                </View>   
            </View>     
            <View style={styles.containerHistoy}>  
                <SearchHistory 
                    showHistory={true} 
                    //containerHeight={containerHeight}
                    onSearch={onSearch}
                />
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    containerInput:{
        position: "relative",
        //alignItems: "flex-end",
        width: "90%"
    },
    containerBars:{
        width: "10%",
        alignContent: "center",
        //alignItems: "center",
        alignSelf: "center",
        position: "relative",
    },
    backArrow: {
        position: "absolute",
        left: 0,
        top: 15,
        color: colors.fontLight
    },
    containerHistoy:{
        //paddingVertical: 10,
        paddingHorizontal: 20
    }
});