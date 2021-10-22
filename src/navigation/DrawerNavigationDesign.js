import React, { useState, useCallback } from 'react'
import { useFocusEffect } from "@react-navigation/native"
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native"
import Orders from '../screens/Account/Orders';
import AccountStack from './AccountStack'
import ProductStack from "./ProductStack"
import AddressStack from './AddressStack';
import Favorites from "../screens/Favorites"
import Categories from '../screens/Categories';
import Terms from '../screens/TermsAndConditions';
import s from '../styles/style';
import { Icon } from 'react-native-elements'
import { Alert } from 'react-native'
import useAuth from '../hooks/useAuth';
import { getMeApi } from "../api/user"
import colors from '../styles/colors';
import Svg, { Path } from 'react-native-svg';

const Drawer = createDrawerNavigator();

function DrawerMenu(props) {
    return (
        <TouchableOpacity onPress={props.navigation}>
            <View style={s.menuContainer}>
                <View style={s.iconoContainer}>
                    <Icon color={colors.fontBlack} type="font-awesome" size={20} name={props.iconName} />
                </View>
                <View style={s.tituloContainer}>
                    <Text style={s.tituloTxt}>{props.titleName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function Logout(props) {

    const { logout } = useAuth();
    const logoutAccount = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que quieres salir de tu cuenta?",
            [
                {
                    text: "No"
                },
                {
                    text: "Si",
                    onPress: logout
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <TouchableOpacity onPress={logoutAccount}>
            <View style={s.menuContainer}>
                <View style={s.iconoContainer}>
                    <Icon color={colors.fontBlack} type="font-awesome" size={20} name={props.iconName} />
                </View>
                <View style={s.tituloContainer}>
                    <Text style={s.tituloTxt}>{props.titleName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function Menu(props) {
    return (
        <View style={s.container}>
            <View style={[s.bgContainer, s.bgContainerLine]}>
                <TouchableOpacity>
                    <View style={s.userContainer}>
                        <Image style={s.userImagen} source={require('../../assets/logo.png')} />
                        {/* <SvgCssUri
                            width="90%"
                            height="90%"
                            source={require('../../assets/logo.svg')}
                        /> */}
                        {/* <View style={s.camaraContainer}>
                            <Image style={s.camaraIcon} source={require('./photo-camera.png')}/>
                        </View> */}
                    </View>
                    {/* <View style={s.userNombre}>
                        <Text style={s.userTitulo}></Text>
                        <Text style={s.userTitulo}>PicPaint App</Text>
                        <Text style={s.userSubTitulo}>Ver Perfil</Text>
                    </View> */}
                </TouchableOpacity>
            </View>
            <View style={s.bgContainerLine}>
                <DrawerMenu iconName='home' titleName='Inicio' navigation={() => props.navigation.navigate('home')} />
                <DrawerMenu iconName='heart' titleName='Lista de deseos' navigation={() => props.navigation.navigate('favorites')} />
                <DrawerMenu iconName='user' titleName='Perfil' navigation={() => props.navigation.navigate('account')} />
                <DrawerMenu iconName='shopping-bag' titleName='Mis pedidos' navigation={() => props.navigation.navigate('orders')} />
                <DrawerMenu iconName='map' titleName='Mis direcciones' navigation={() => props.navigation.navigate('address')} />
                <DrawerMenu iconName='list-ul' titleName='Categorías' navigation={() => props.navigation.navigate('categories')} />
            </View>
            <View style={s.bgContainerLine}>
                <DrawerMenu iconName='question-circle' titleName='Ayuda' />
                <DrawerMenu iconName='file' titleName='Terminos y condiciones' navigation={() => props.navigation.navigate('terms')}/>
            </View>
            <View style={s.bgContainerLine}>
                <Logout iconName='sign-out' titleName='Cerrar sesión' />
            </View>
            <DrawerMenu iconName="copyright" titleName='Acerca de Amantoli' />
        </View>
    )
}

function DrawerNavigationDesign() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="home"
                drawerContent={(props) => <Menu {...props} />}
            >
                <Drawer.Screen
                    name="home"
                    component={ProductStack}
                />
                <Drawer.Screen
                    name="favorites"
                    component={Favorites}
                />
                <Drawer.Screen
                    name="account"
                    component={AccountStack}
                />
                <Drawer.Screen
                    name="orders"
                    component={Orders}
                />
                <Drawer.Screen
                    name="address"
                    component={AddressStack}
                />
                <Drawer.Screen
                    name="categories"
                    component={Categories}
                />
                <Drawer.Screen
                    name="terms"
                    component={Terms}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


export default DrawerNavigationDesign;