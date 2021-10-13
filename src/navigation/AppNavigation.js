import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from "../styles/colors"
import AccountStack from './AccountStack'
import ProductStack from "./ProductStack"
import DrawerNavigation from './DrawerNavigation';
import Favorites from "../screens/Favorites"
import Cart from "../screens/Cart"
import { Icon } from 'react-native-elements'

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            
            <Tab.Navigator
                barStyle={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "#F3F4F6",
                    borderRadius: 15,
                    height: 80,
                    alignItems: "center",
                    alignSelf: "center",
                    ...styles.shadow,
                    paddingVertical: 10
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: (routeStatus)  => {
                        return setIcon(route, routeStatus);
                    }
                })}>
                <Tab.Screen
                    name="home"
                    component={ProductStack}
                    options={{
                        title: "Principal",
                        //tabBarColor: colors.primary
                        
                    }}
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{
                        title: "Favoritos",
                        //tabBarColor: colors.primary
                    }}
                />
                <Tab.Screen
                    name="cart"
                    component={Cart}
                    options={{
                        tabBarLabel: "Bolsa",
                        //tabBarColor: colors.primary
                    }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{
                        title: "Perfil"
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function setIcon(route, routeStatus) {
    let iconName = "";

    switch (route.name) {
        case "home":
            iconName="home";
            break;
        case "favorites":
            iconName="heart";
            break;
        case "cart":
            iconName="shopping-bag";
            break;
        case "account":
            iconName="user";
            break;
        default:
            break;
    }
    return <AwesomeIcon name={iconName} style={styles.icon} />
}

const styles = StyleSheet.create ({
    navigation: {
        //backgroundColor: colors.dark
        //backgroundColor: "#F3F4F6",
        
    },
    icon: {
        fontSize: 20,
        color: "#9CA3AF",
    },
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width:0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})
