import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image, useWindowDimensions } from "react-native";
import { WebView } from 'react-native-webview';
import * as Yup from "yup";
import { useToast } from 'react-native-fast-toast';
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { formStyle } from "../../styles";
import { IPLOCAL } from "../../utils/constants";
import RenderHtml from 'react-native-render-html';

export default function Paypal(props) {

    const { totalPayment, selectedAddress, products } = props;
    const { auth } = useAuth();
    const navigation = useNavigation();
    const toast = useToast();
    const [showModal, setShowModal] = useState(false);
    const { width } = useWindowDimensions();

    const sourceHTML = {
      html: `
    <!-- PayPal Logo -->
      <table border="0" cellpadding="" cellspacing="0" align="center">
        <tbody>
          <tr>
            <td align="center">
            </td>
          </tr>
          <tr>
            <td align="center">
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/logotipo_paypal_seguridad.png" border="0" alt="Pague con PayPal" />
            </td>
          </tr>
        </tbody>
      </table>
    <!-- PayPal Logo -->`
    };

    const handleResponse = data => {
        if (data.title === "success") {
            setShowModal(false);
            navigation.navigate("account", { screen: "orders" });
        } else if (data.title === "cancel") {
            setShowModal(false);
        } else {
            return;
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <WebView
                    source={{ uri: `http://${IPLOCAL}:3000/paypal?prueba=prueba`}}
                    onNavigationStateChange={data =>
                        handleResponse(data)
                    }
                    injectedJavaScript={`document.f1.submit()`}
                />
            </Modal>
            <TouchableOpacity
                style={{ alignContent: "center", alignItems: "center" }}
                onPress={() => setShowModal(true)}
            >
              <RenderHtml
                  contentWidth={width}
                  source={sourceHTML}
              />
            </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginVertical: 20
  },
});
