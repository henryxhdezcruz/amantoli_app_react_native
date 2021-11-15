import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import ScreenLoading from "../../components/ScreenLoading";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import ListOrder from "../../components/Order/ListOrder";
import { getOrdersApi } from "../../api/order";
import StatusBar from "../../components/StatusBar";
import useAuth from "../../hooks/useAuth";
import Search from "../../components/Search";
import colors from "../../styles/colors";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getOrdersApi(auth);
        console.log(response);
        setOrders(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>MIS PEDIDOS</Text>

        {!orders ? (
          <ScreenLoading text="Cargando lista" />
        ) : size(orders) === 0 ? (
          <Text style={styles.noOrdersText}>No tienes pedidos</Text>
        ) : (
          <ListOrder orders={orders} />
        )}
      </ScrollView>
    </>
  );
}

var styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noOrdersText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
    padding: 20,
    margin: 10
  },
  loading: {
    marginTop: 20,
  },
});
