import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import colors from "../../styles/colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function AddressList(props) {
  const { addresses, selectedAddress, setSelectedAddress } = props;

  const navigation = useNavigation();

  useEffect(() => {
    addresses && setSelectedAddress(addresses[0]);
  }, [addresses]);

  const goToAdresses = () => {
    navigation.navigate("address");
  };

  return (
    <View>
      <TouchableOpacity onPress={goToAdresses}>
        <Text style={styles.Directions}>Administrar mis direcciones</Text>
      </TouchableOpacity>
      {!addresses && <ScreenLoading size="large" text="Cargando lista de direcciones" />}
      {map(addresses, (address) => (
        <TouchableWithoutFeedback
          key={address.id}
          onPress={() => setSelectedAddress(address)}
        >
          <View
            style={[
              styles.address,
              address.id === selectedAddress?.id && styles.checked,
            ]}
          >
            <View style={styles.containTitle}>
              <Text style={styles.title}>{address.title}</Text>
            </View>
            <View style={styles.containData}>
              <Text>{address.name}</Text>
              <Text>{address.country}</Text>
              <View style={styles.blockLine}>
                <Text>{address.state}, </Text>
                <Text>{address.city}, </Text>
                <Text>{address.postal_code}</Text>
              </View>
              <Text>Numero de telefono: {address.phone}</Text>
              <Text>Detalles extra: {address.address}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  address: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.bgGray,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  checked: {
    borderColor: colors.primarytransparentborder,
    backgroundColor: colors.primarytransparent,
    //backgroundColor: "#0098d330",
  },
  containTitle: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgGray,
    padding: 10,
    // marginBottom: 10,
    backgroundColor: colors.bgGray,
    alignContent: "center"
  },
  containData: {
    padding: 10
  },
  Directions: {
    color: colors.dark,
    fontSize: 16,
    paddingBottom: 10
  }
});
