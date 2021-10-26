import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Keyboard, Animated } from 'react-native'
import { Searchbar } from "react-native-paper"
import { useNavigation, useRoute } from '@react-navigation/native'
import { AnimatedIcon, inputAnimationWidth, inputAnimation, animatedTransition, animatedTransitionReset, arrowAnimation, barsAnimation } from './SearchAnimation'
import { updateSearchHistoryApi } from '../../api/search'
import SearchHistory from './SearchHistory'
import colors from "../../styles/colors"
import { Icon } from 'react-native-elements'


export default function Search(props) {

    const { currentSearch } = props;

    const [searchQuery, setSearchQuery] = useState(currentSearch || "");

    const navigation = useNavigation();

    const route = useRoute();

    const onChangeSearch = (query) => setSearchQuery(query);

    const [showHistory, setShowHistory] = useState(false)

    const openSearch = () => {
        animatedTransition.start();
        setShowHistory(true);
    }

    const closeSearch = () => {
        animatedTransitionReset.start();
        Keyboard.dismiss();
        setShowHistory(false);
    }

    const onSearch = async (reuseSearch) => {
        const isReuse = typeof reuseSearch === "string";
        closeSearch();
        !isReuse && (await updateSearchHistoryApi(searchQuery));

        if (route.name === "search") {
            navigation.push("search", {
                search: isReuse ? reuseSearch : searchQuery,
            });
        } else {
            navigation.navigate("search", {
                search: isReuse ? reuseSearch : searchQuery,
            });
        }

    }

    const OpenDrawer = () => {
        navigation.openDrawer();
    }

    const OpenCart = () => {
        navigation.navigate("cart");
    }

    return (
        <View>
            <View
                style={styles.container}
            >
                <View >
                    <View style={styles.containerInput} >
                        <AnimatedIcon
                            name='bars'
                            type='font-awesome'
                            color="white"
                            size={20}
                            onPress={OpenDrawer}
                            style={[styles.backBars, barsAnimation]}
                        />
                        <AnimatedIcon
                            name="arrow-left"
                            size={20}
                            style={[styles.backArrow, arrowAnimation]}
                            onPress={closeSearch}
                        />
                        <View style={styles.width}>
                            <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]} >
                                <Searchbar
                                    placeholder="¿Estás buscando algún producto?"
                                    style={{ fontSize: 16 }}
                                    iconColor={colors.primary}
                                    value={searchQuery}
                                    onFocus={openSearch}
                                    onChangeText={onChangeSearch}
                                    onSubmitEditing={onSearch}
                                />
                            </Animated.View>
                        </View>
                        <AnimatedIcon
                            name="shopping-cart"
                            size={20}
                            style={[styles.cart, barsAnimation]}
                            onPress={OpenCart}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.containerHistoy}>
                <SearchHistory
                    showHistory={showHistory}
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
    containerInput: {
        position: "relative",
        alignItems: "flex-end",
        width: "90%",
        flexDirection: "row",
    },
    width: {
        width: "100%",
        alignItems: "flex-start",
        paddingLeft: "10%"
    },
    containerBars: {
        width: "10%",
        alignContent: "center",
        alignItems: "flex-start",
        alignSelf: "center",
        //position: "relative",
    },
    backArrow: {
        position: "absolute",
        left: 0,
        top: 15,
        color: colors.fontLight
    },
    backBars: {
        position: "absolute",
        left: 0,
        top: 8,
        color: colors.fontLight
    },
    cart: {
        color: colors.primary,
        alignSelf: "center",
        marginLeft: 12,
        bottom: 5,
    },
    containerHistoy: {
        //paddingVertical: 10,
        paddingHorizontal: 20
    }
});