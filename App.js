import React, { useState, useMemo, useEffect } from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import jwtDecode from 'jwt-decode';
import AppNavigation from "./src/navigation/AppNavigation"
import DrawerNavigation from './src/navigation/DrawerNavigation';
import DrawerNavigationDesign from './src/navigation/DrawerNavigationDesign';
import AuthScreen from "./src/screens/Auth"
import AuthContext from "./src/context/AuthContext"
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token"
import { ToastProvider } from 'react-native-fast-toast'
import Toast from 'react-native-toast-message';
import AuthStack from './src/navigation/AuthStack';

export default function App() {

  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: token,
        });
      } else {
        setAuth(null);
      }
    })()
  }, []);

  const login = (user) => {
    setTokenApi(user.id);
    setAuth({
      token: user.id,
      idUser: user.id
    })
  }
  
  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  const fontConfig = {
    web: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    ios: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    android: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    }
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#404040',
      secondary: '#404040',
      accent: '#F97316',
    },
    fonts: configureFonts(fontConfig),
  };

  return (
    <ToastProvider>
      <AuthContext.Provider value={authData}>
        <PaperProvider theme={theme}>
          {auth ? <DrawerNavigationDesign /> : <AuthStack/>}
        </PaperProvider>
      </AuthContext.Provider>
    </ToastProvider>
  );
}
// /*AuthScreen*/



// ------------------------------------------------------------------------------------------------



// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// // import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
// import Mercado from '@blackbox-vision/react-native-mercadopago-px'

// // You should create the preference server-side, not client-side but we show client-side for the sake of simplicity
// const getPreferenceId = async (payer, ...items) => {
//   const response = await fetch(
//     `https://api.mercadopago.com/checkout/preferences?access_token=TEST-3794872356163058-101414-6acddcab55b985a0514774116e67aefc-453192177`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         items,
//         payer: {
//           email: payer,
//         },
//       }),
//     }
//   );

//   const preference = await response.json();

//   return preference.id;
// };

// export default function App() {
//   const [paymentResult, setPaymentResult] = useState(null);

//   const startCheckout = async () => {
//     try {

//       const preferenceId = await getPreferenceId('payer@email.com', {
//         title: 'Dummy Item Title',
//         description: 'Dummy Item Description',
//         quantity: 1,
//         currency_id: 'MXN',
//         unit_price: 10.0,
//       });

//       console.log(preferenceId);

//       const payment = await Mercado.createPayment({
//         publicKey: 'TEST-45d3b70d-3886-4b08-9af1-ede87ec932e6',
//         preferenceId,
//       });

//       console.log(payment);

//       // setPaymentResult(payment);
//     } catch (err) {
//       Alert.alert('Something went wrong', err.message);
//     }
//   };

//   return (
//     <View style={{padding:30}}>
//       <TouchableOpacity onPress={startCheckout}>
//         <Text /*style={styles.text}*/>Start Payment</Text>
//       </TouchableOpacity>
//       <Text /*style={styles.text}*/>Payment: {JSON.stringify(paymentResult)}</Text>
//     </View>
//   );
// }






// ---------------------------------------------------------------------------------------------







// import React from 'react';
// import { MercadoPagoCheckout  } from 'react-native-checkout-mercadopago';
// import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// import env from './app.json';

// export default class Example extends React.Component {
//     state = {
//         status: null
//     };

//     handlePaymentClick = async () => {
//         try {
//             const enableDarkFont = false;
//             const backgroundColor = '#F44336';

//             this.updatePaymentStatus(null);

//             const payment = await MercadoPagoCheckout.startForPayment(env['public_key'], env['preference_id'], {
//                 backgroundColor,
//                 enableDarkFont
//             });

//             this.updatePaymentStatus(JSON.stringify(payment, null, 2));
//         } catch (error) {
//             this.updatePaymentStatus(error.toString());
//         }
//     };

//     // handlePaymentDataClick = async () => {
//     //     try {
//     //         const enableDarkFont = false;
//     //         const backgroundColor = '#F44336';

//     //         this.updatePaymentStatus(null);

//     //         const payment = await MercadoPagoCheckout.startForPaymentData(env['public_key'], env['preference_id'], {
//     //             backgroundColor,
//     //             enableDarkFont
//     //         });

//     //         this.updatePaymentStatus(JSON.stringify(payment, null, 2));
//     //     } catch (error) {
//     //         this.updatePaymentStatus(error.toString());
//     //     }
//     // };

//     updatePaymentStatus = status => this.setState(state => ({ status }));

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.instructions}>
//                     Tap the following button to start the checkout flow for Payment
//                 </Text>
//                 <TouchableHighlight style={styles.button} onPress={this.handlePaymentClick}>
//                     <Text style={styles.text}>
//                         CHECKOUT PRODUCT FOR $100
//                     </Text>
//                 </TouchableHighlight>
//                 <Text style={styles.instructions}>
//                     Tap the following button to start the checkout flow for Payment Data
//                 </Text>
//                 <TouchableHighlight style={styles.button} onPress={this.handlePaymentDataClick}>
//                     <Text style={styles.text}>
//                         CHECKOUT PRODUCT FOR $100
//                     </Text>
//                 </TouchableHighlight>
//                 <Text>
//                     {this.state.status}
//                 </Text>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF'
//     },
//     button: {
//         backgroundColor: 'blue',
//         padding: 10,
//         margin: 10
//     },
//     text: {
//         color: 'white'
//     }
// });





// -------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { Text, Alert, View, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { MainContainer, Title, InputText, PersonalButton, HeaderCheckout } from './styles';
// import { WebView } from 'react-native-webview';

// export default function Checkout() {

//     const [idPagamento, setIdPagamento] = useState("1")
//     const [emailPagamento, setEmailPagamento] = useState("meuemail@gmail.com")
//     const [descricaoPagamento, setDescricaoPagamento] = useState("Venda de produto digital")
//     const [vlrPagamento, setVlrPagamento] = useState("5.00")
//     const [showCheckout, setShowCheckout] = useState(false)

//     const stateChange = (state) => {
//         switch (state.title) {
//             case 'success':
//                 setShowCheckout(false)
//                 Alert.alert("Pagamento aprovado!", `Recebemos seu pagamento de ${vlrPagamento}`)
//                 break;
//             case 'pending':
//                 setShowCheckout(false)
//                 Alert.alert("Pagamento pendente!", `Seu pagamento de ${vlrPagamento} está pendente de processamento, assim que for processado seguiremos com o pedido!`)
//                 break;
//             case 'failure':
//                 setShowCheckout(false)
//                 Alert.alert("Pagamento não aprovado!", 'Verifique os dados e tente novamente')
//                 break;
//         }
//     }

//     if (!showCheckout) {
//         return (

//             <MainContainer>
//                 <Title>Protótipo de pagamento</Title>
//                 <InputText value={idPagamento} onChangeText={(text) => setIdPagamento(text)} placeholder={'Informe o id do produto'} keyboardType={'numeric'}></InputText>
//                 <InputText value={emailPagamento} onChangeText={(text) => setEmailPagamento(text)} placeholder={'Informe o e-mail do comprador'} keyboardType={'email-address'}></InputText>
//                 <InputText value={descricaoPagamento} onChangeText={(text) => setDescricaoPagamento(text)} placeholder={'Informe a descrição da venda'}></InputText>
//                 <InputText value={vlrPagamento} onChangeText={(text) => setVlrPagamento(text)} placeholder={'Informe o valor do produto'} keyboardType={'numeric'}></InputText>
//                 <PersonalButton onPress={() => setShowCheckout(true)}><Text>Pagar R$ {vlrPagamento}</Text></PersonalButton>

//             </MainContainer>
//         )
//     } else {

//         return (
//             <View style={{ flex: 1, justifyContent: 'center' }}>
//                 <HeaderCheckout>
//                     <TouchableOpacity onPress={() => setShowCheckout(false)}><Text style={{ fontSize: 20, color: 'white' }}>{"<<"}</Text></TouchableOpacity>
//                     <Title>Pagamento do pedido</Title>
//                 </HeaderCheckout>
//                 <WebView
//                     source={{ uri: `https://3333-f242b4a4-9b16-45ad-92f8-80bcd2dc363a.ws-us02.gitpod.io/payments/checkout/${idPagamento}/${emailPagamento}/${descricaoPagamento}/${vlrPagamento}` }}
//                     onNavigationStateChange={state => stateChange(state)}
//                     startInLoadingState={true}
//                     renderLoading={() => <ActivityIndicator></ActivityIndicator>}
//                 />

//             </View>
//         )

//     }
// }


// --------------------------------------------------------------------------------------


// import React from "react";
// import { View, Text, TouchableOpacity, Modal } from "react-native";
// import { WebView } from 'react-native-webview';

// export default class App extends React.Component {
//     state = {
//         showModal: false,
//         status: "Pending"
//     };
//     handleResponse = data => {
//         if (data.title === "success") {
//             this.setState({ showModal: false, status: "Complete" });
//         } else if (data.title === "cancel") {
//             this.setState({ showModal: false, status: "Cancelled" });
//         } else {
//             return;
//         }
//     };
//     render() {
//         return (
//             <View style={{ marginTop: 100 }}>
//                 <Modal
//                     visible={this.state.showModal}
//                     onRequestClose={() => this.setState({ showModal: false })}
//                 >
//                     <WebView
//                         source={{ uri: "http://192.168.129.62:3000/paypal?prueba=prueba" }}
//                         onNavigationStateChange={data =>
//                             this.handleResponse(data)
//                         }
//                         injectedJavaScript={`document.f1.submit()`}
//                     />
//                     {/* <WebView
//                         source={{ uri: 'https://logrocket.com/' }}
//                         style={{ marginTop: 20 }}
//                     /> */}
//                 </Modal>
//                 <TouchableOpacity
//                     style={{ width: 300, height: 100 }}
//                     onPress={() => this.setState({ showModal: true })}
//                 >
//                     <Text>Pay with Paypal</Text>
//                 </TouchableOpacity>
//                 <Text>Payment Status: {this.state.status}</Text>
//             </View>
//         );
//     }
// }