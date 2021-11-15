import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from 'react-native-fast-toast';
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { paymentCartApi, deleteCartApi } from "../../api/cart";
import useAuth from "../../hooks/useAuth";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constants";
import { formStyle } from "../../styles";
import colors from "../../styles/colors";
const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY);

export default function Payment(props) {
  const { totalPayment, selectedAddress, products } = props;
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigation = useNavigation();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      const result = await stripe.createToken({ card: formData });
      //setLoading(true);
      console.log(auth);
      console.log(products);
      console.log(selectedAddress);
      console.log(totalPayment);
      console.log(result.id);

      if (result?.error) {
        toast.show(result.error.message, {
          duration: 4000,
          offset: 40,
          animationType: 'zoom-in',
        });
        setLoading(false);
      } else {
        const response = await paymentCartApi(
          auth,
          products,
          selectedAddress,
          totalPayment,
          result.id,
        );
        console.log(response.status);
          setLoading(false);

        // if (response.status == true) {
        //   console.log("Pedido completado");
              toast.show("Pago realizado correctamente", {
                duration: 4000,
                offset: 40,
                animationType: 'zoom-in',
              });
        //   await deleteCartApi();
        //   navigation.navigate("account", { screen: "orders" });
        // } else {
        //   toast.show("Error al realizar el pedido", {
        //     duration: 4000,
        //     offset: 40,
        //     animationType: 'zoom-in',
        //   });
        //   setLoading(false);
        // }
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Nombre de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de tarjeta"
        maxLength={16}
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />
      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYearInputs}>
          <TextInput
            label="Mes"
            maxLength={2}
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label="Año"
            maxLength={2}
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          maxLength={3}
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>

      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={!loading && formik.handleSubmit}
        loading={loading}
      >
        Pagar {totalPayment && `($MXN ${totalPayment})`}
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().min(16).max(16).required(true),
    exp_month: Yup.string().min(2).max(2).required(true),
    exp_year: Yup.string().min(2).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(2).required(true),
  };
}

const styles = StyleSheet.create({
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputCvc: {
    width: "40%",
  },
  containerMonthYearInputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 16,
  },
});
