import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, Linking, Alert } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useNavigation } from '@react-navigation/native'
import Search from "../../components/Search"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useToast } from 'react-native-fast-toast'
import { size } from "lodash";
import useAuth from "../../hooks/useAuth"
import { addAddressApi, getAddressApi, updateAddressApi } from "../../api/address"
import { getInfoCP_SimplifiedApi } from '../../api/copomex' 
import { formStyle } from "../../styles"
import colors from '../../styles/colors'


export default function AddAddress(props) {

    const { 
        route: {params},
    } = props;

    const [loading, setLoading] = useState(false);

    const [newAddress, setNewAddress] = useState(true);

    const { auth } = useAuth();

    const navigation = useNavigation();

    const toast = useToast();

    const supportedURL = "https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx";

    const OpenURLButton = ({ url }) => {
        const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
        await Linking.openURL(url);
        } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button color={colors.primary} onPress={handlePress} >No sé mi código</Button>;
    };

    useEffect(() => {
        ( async () => {
            if(params?.idAddress) {
                setNewAddress(false);
                navigation.setOptions({ title: "Actualiza tu dirección"});
                const response = await getAddressApi(auth, params.idAddress);
                await formik.setFieldValue("_id", response._id);
                await formik.setFieldValue("title", response.title);
                await formik.setFieldValue("name_lastname", response.name_lastname);
                await formik.setFieldValue("address", response.address);
                await formik.setFieldValue("postal_code", response.postal_code);
                await formik.setFieldValue("city", response.city);
                await formik.setFieldValue("state", response.state);
                await formik.setFieldValue("country", response.country);
                await formik.setFieldValue("phone", response.phone);
            }
        })()
    }, [params])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                if(newAddress) await addAddressApi(auth, formData);
                else await updateAddressApi(auth, formData)
                navigation.goBack();
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    });

    const getInfoCP_Simplified = async (cp) => {
        if(size(cp)==5){
            const query = await getInfoCP_SimplifiedApi(cp);
            console.log(query);
            if(query != null){
                await formik.setFieldValue("city", query.response.municipio);
                await formik.setFieldValue("state", query.response.estado);
                await formik.setFieldValue("country", query.response.pais);
            }
            toast.show("Los campos de pais, estado y ciudad fueron autocompletados", {
                duration: 4000,
                offset: 40,
                animationType: 'zoom-in',
            });
        }
    };

    return (
        <>
            <KeyboardAwareScrollView extraScrollHeight={25}>
                <View style={styles.container}>
                    <Text style={styles.title}>Nueva direccion</Text>
                    <TextInput 
                        label="Titulo de la dirección*" 
                        maxLength={40}
                        style={formStyle.input} 
                        onChangeText={(text) => formik.setFieldValue("title", text) }
                        value={formik.values.title}
                        error={formik.errors.title}
                    />
                    <TextInput 
                        label="Nombre y apellido*" 
                        maxLength={40}
                        autoCompleteType= "name"
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("name_lastname", text) }
                        value={formik.values.name_lastname}
                        error={formik.errors.name_lastname}
                    />

                    <View style={{flexDirection:"row", width: "100%", marginBottom: 20}}>
                        <TextInput 
                            label="Codigo Postal*" 
                            keyboardType= "numeric"
                            maxLength={5}
                            autoCompleteType= "postal-code"
                            style={[formStyle.input],{width:"100%"}}
                            onChangeText={(text) => {
                                formik.setFieldValue("postal_code", text);
                                getInfoCP_Simplified(text);
                            } }
                            value={formik.values.postal_code}
                            error={formik.errors.postal_code}
                        />

                        <View
                            style={{ width: "100%", position: "absolute", alignSelf: "center", alignItems: "flex-end", paddingRight: 20}} 
                        >
                            <OpenURLButton url={supportedURL} />
                        </View>
                    </View>


                    <TextInput 
                        label="Pais*" 
                        editable={false}
                        maxLength={40}
                        style={formStyle.input}
                        onChangeText={(text) => {
                            formik.setFieldValue("country", text);
                            getInfoCP_Simplified(text);
                        } }
                        value={formik.values.country}
                        error={formik.errors.country}
                    />
                    <TextInput 
                        label="Estado*" 
                        editable={false}
                        maxLength={50}
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("state", text) }
                        value={formik.values.state}
                        error={formik.errors.state}
                    />
                    <TextInput 
                        label="Ciudad / Delegación / Municipio*" 
                        editable={false}
                        maxLength={50}
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("city", text) }
                        value={formik.values.city}
                        error={formik.errors.city}
                    />
                    <TextInput 
                        label="Telefono" 
                        dataDetectorTypes= "phoneNumber"
                        autoCompleteType= "tel"
                        maxLength={12}
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("phone", text) }
                        value={formik.values.phone}
                        error={formik.errors.phone}
                    />
                    <TextInput 
                        label="Indicaciones Adicionales" 
                        numberOfLines= {5}
                        maxFontSizeMultiplier={4}
                        editable
                        maxLength={200}
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("address", text) }
                        value={formik.values.address}
                        error={formik.errors.address}
                    />
                    <Button 
                        mode="contained" 
                        style={[formStyle.btnSuccess, styles.btnSucces]}
                        onPress={formik.handleSubmit}
                        loading={loading}
                    >
                        {newAddress ? "Crear dirección" : "Actualizar dirección"}
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}

function initialValues () {
    return {
        title:"",
        name_lastname:"",
        address:"",
        postal_code:"",
        city:"",
        state:"",
        country:"",
        phone:"",
    }
}

function validationSchema () {
    return {
        title: Yup.string().required(true),
        name_lastname: Yup.string().required(true),
        postal_code: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        country: Yup.string().required(true),
        address: Yup.string(),
        phone: Yup.string(),
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        paddingVertical: 20
    },
    btnSucces: {
        marginBottom: 20
    }
})