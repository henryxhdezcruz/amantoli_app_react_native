import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Addresses from '../screens/Account/Addresses'
import AddAddress from '../screens/Account/AddAddress'
import colors from "../styles/colors"

const Stack = createStackNavigator();

export default function AddressStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
            }}
        >
            <Stack.Screen 
                name="addresses"
                component={Addresses}
                options={{
                    headerShown: false
                }}                
            />
            <Stack.Screen 
                name="add-address"
                component={AddAddress}
                options={{
                    title: "Nueva dirección",
                }}                
            />
        </Stack.Navigator>
    )
}
