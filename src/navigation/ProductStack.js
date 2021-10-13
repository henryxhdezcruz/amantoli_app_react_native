import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/Product/Home"
import Product from "../screens/Product/Product"
import Search from '../screens/Product/Search'
import Cart from '../screens/Cart'
import colors from "../styles/colors"
import SearchView from "../components/Search/SearchView"
import Category from "../components/Category/Category"

const Stack = createStackNavigator();

export default function ProductStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
            }}
            initialRouteName="home"
        >
            <Stack.Screen
                name="home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="product"
                component={Product}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="search"
                component={Search}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="search-view"
                component={SearchView}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="cart"
                component={Cart}
                options={{ headerTitle: "Carro de compras" }}
            />
            <Stack.Screen
                name="category"
                component={Category}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
