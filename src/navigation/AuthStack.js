import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native'
import CodeForm from "../components/Auth/CodeForm"
import ResetPwdForm from '../components/Auth/ResetPwdForm'
import ForgotPwdForm from '../components/Auth/ForgotPwdForm'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import colors from "../styles/colors"

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: colors.fontLight,
                    headerStyle: { backgroundColor: colors.bgDark },
                }}
            >
                <Stack.Screen 
                    name="login"
                    component={LoginForm}
                    options={{
                        headerShown: false
                    }}                
                />
                <Stack.Screen 
                    name="code-form"
                    component={CodeForm}
                    options={{
                        headerShown: false
                    }}                
                />
                <Stack.Screen 
                    name="reset-pwd"
                    component={ResetPwdForm}
                    options={{
                        headerShown: false
                    }}                
                />
                <Stack.Screen 
                    name="forgot-pwd"
                    component={ForgotPwdForm}
                    options={{
                        headerShown: false
                    }}                
                />
                <Stack.Screen 
                    name="register"
                    component={RegisterForm}
                    options={{
                        headerShown: false
                    }}                
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
