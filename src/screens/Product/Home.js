import React from 'react'
import { StyleSheet, ScrollView, Button } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import Search from "../../components/Search"
import ProductosMadera from '../../components/Home/ProductosMadera'
import ProductosTextiles from '../../components/Home/ProductosTextiles'
import ProductosBarro from '../../components/Home/ProductosBarro'
import ProductosPalma from '../../components/Home/ProductosPalma'
import ScreenLoading from "../../components/ScreenLoading"
import StatusBar from "../../components/StatusBar"
import Banner from '../../components/Home/Banner'
import colors from '../../styles/colors'

export default function Home() {
    return (
        <>
            <StatusBar/>
            <Search />
            <ScrollView>
                <Banner />
                <ProductosMadera />
                <ProductosTextiles />
                <Banner />
                <ProductosBarro />
                <ProductosPalma />
            </ScrollView>
        </>
    )
}