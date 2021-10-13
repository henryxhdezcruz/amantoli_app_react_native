import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TextInput, Button} from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import logo from "../../../assets/logo.png"
import { useFormik } from "formik"
import * as Yup from "yup"
import { resetPassword } from "../../api/send_email"
import { Icon } from 'react-native-elements';
import { formStyle } from '../../styles'
import { useToast } from 'react-native-fast-toast';
import { layoutStyle } from "../../styles"


export default function ResetPwdForm(props) {

    const { route } = props;

    const { params } = route;
    
    const email = params.email;

    const [loading, setLoading] = useState(false);

    const [secure, setSecure] = useState(true);

    const [secureR, setSecureR] = useState(true);

    const navigation = useNavigation();

    const toast = useToast();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {

            setLoading(true);

            const response = await resetPassword(email, formData.password);
            
            if (response.status === false || response === null) {
                setLoading(false);
                toast.show("Ocurrio un error al restaurar su contraseña", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
            } else {
                setLoading(false);
                toast.show("Su contraseña se restauró correctamente", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
                navigation.navigate("login");
            } 
        }
    });
    
    return (
        <View style={layoutStyle.container}>
            <Image style={layoutStyle.logo} source={logo} />
            {/* <TextInput 
                label="Ingresa tu nueva Contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            /> */}
            
            <View style={styles.containerPwd}>
                <TextInput
                    label="Contraseña"
                    maxLength={40}
                    style={[formStyle.input], { width: "100%" }}
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    value={formik.values.password}
                    error={formik.errors.password}
                    secureTextEntry={secureR}
                />
                <View style={styles.eye} >
                    <Icon
                        type='font-awesome'
                        style={styles.iconeye}
                        name={secureR ? "eye" : 'eye-slash'}
                        color='gray'
                        onPress={() => setSecureR(!secureR)}
                    />
                </View>
            </View>

            {/* <TextInput 
                label="Confirmar contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
            /> */}

            <View style={styles.containerPwd}>
                <TextInput
                    label="Confirmar contraseña"
                    maxLength={40}
                    style={[formStyle.input], { width: "100%" }}
                    onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                    value={formik.values.repeatPassword}
                    error={formik.errors.repeatPassword}
                    secureTextEntry={secure}
                />
                <View style={styles.eye} >
                    <Icon
                        type='font-awesome'
                        style={styles.iconeye}
                        name={secure ? "eye" : 'eye-slash'}
                        color='gray'
                        onPress={() => setSecure(!secure)}
                    />
                </View>
            </View>

            <Button 
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Actualizar contraseña
            </Button>
        </View>
    )
}

function initialValues () {
    return {
        password:"",
        repeatPassword:""
    }
}

function validationSchema () {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).required(true).oneOf([Yup.ref("password")])
    }
}

const styles = StyleSheet.create({
    eye: {
        width: "100%",
        position: "absolute",
        alignSelf: "center",
        alignItems: "flex-end",
        paddingRight: 20
    },
    containerPwd: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 20
    },
    iconeye: {
        position: "absolute",
        marginRight: 50
    }
})