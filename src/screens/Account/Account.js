import React, {useState, useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import Search from "../../components/Search"
import ScreenLoading from "../../components/ScreenLoading"
import StatusBar from "../../components/StatusBar"
import colors from '../../styles/colors'
import { getMeApi } from "../../api/user"
import useAuth from "../../hooks/useAuth"
import UserInfo from "../../components/Account/UserInfo"
import Menu from "../../components/Account/Menu"

export default function Account() {

    const [user, setUser] = useState(null);
    const {auth} = useAuth();
    //console.log(auth);

    useFocusEffect(
        useCallback(() => {
            ( async () => {
                const response = await getMeApi(auth.token);
                setUser(response);
            })()
        }, [])
    );



    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
           
           {!user ? (
               <ScreenLoading size="large" text="Cargando..." color="#0891B2" />
           ) : (
               <>
                    <Search />
                    <ScrollView>
                        <UserInfo user={user} />
                        <Menu />
                    </ScrollView>
               </>
           )}
        </>
    )
}