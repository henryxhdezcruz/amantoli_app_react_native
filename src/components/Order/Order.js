import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { API_URL } from "../../utils/constants";
import colors from "../../styles/colors";
import { map } from "lodash";

export default function Order(props) {
  const { order } = props;

  map(order, (ord) => (console.log(ord)));

  var resp = "";

  const status = (status) => {

    switch (status) {
      case '1':
        resp = "PENDIENTE"
        break;
      case '2':
        resp = "PAGADO"
        break;
      case '3':
        resp = "ENVIADO"
        break;
      case '2':
        resp = "ANULADO"
        break;
      case '3':
        resp = "ENTREGADO"
        break;
    }
    return resp;
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.left}>
          <Text style={styles.text}>Orden - {order.id}</Text>
          <Text style={styles.text}>{order.created_at}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.text}>{status(order.status)}</Text>
          <Text style={styles.text}>$MXN {order.total}</Text>
          <Text style={styles.text}>{order.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    elevation: 3,
    backgroundColor: colors.bgwhite,
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 5
  },
  info: {
    margin: 10,
    flexDirection: "row",
    alignContent: "space-between"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  left: {
    width: "50%"
  },
  right: {
    width: "50%",
    alignItems: "flex-end"
  },
  text: {
    color: colors.fontBlack,
    fontSize: 16,
    marginVertical: 2
  }
});
