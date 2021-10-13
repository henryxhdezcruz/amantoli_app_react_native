import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native"
import Orders from '../screens/Account/Orders';
import Addresses from '../screens/Account/Addresses';
import Home from "../screens/Product/Home"
import AccountStack from './AccountStack'
import ProductStack from "./ProductStack"
import Favorites from "../screens/Favorites"
import Cart from "../screens/Cart"
import AwesomeIcon from "react-native-vector-icons/FontAwesome"

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="home"
                screenOptions={({ route }) => ({
                    drawerIcon: (routeStatus)  => {
                        return setIcon(route, routeStatus);
                    }
                })}
                //drawerContent={()=> <Image style={styles.image} source="../../assets/logo.png"></Image>}
            >
                <Drawer.Screen 
                    name="home" 
                    component={ProductStack} 
                    options={{
                        title: "Inicio",
                    }}
                />
                <Drawer.Screen 
                    name="favorites" 
                    component={Favorites} 
                    options={{
                        title: "Favoritos",
                    }}
                />
                <Drawer.Screen 
                    name="account" 
                    component={AccountStack} 
                    options={{
                        title: "Cuenta",
                    }}
                />
            </Drawer.Navigator>
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
    // navigation: {
    //     //backgroundColor: colors.dark
    //     //backgroundColor: "#F3F4F6",
        
    // },
    icon: {
        fontSize: 20,
        color: "#9CA3AF",
    },
    // shadow: {
    //     shadowColor: "#7F5DF0",
    //     shadowOffset: {
    //         width:0,
    //         height: 10,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.5,
    //     elevation: 5
    // },
    image: {
        height: 150,
        resizeMode: "contain"
    },
})
