import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import logo from "../../../assets/logo.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../api/user"
import useAuth from "../../hooks/useAuth"
import { formStyle } from "../../styles"
import { useToast } from 'react-native-fast-toast'
import { Icon } from 'react-native-elements';
import { layoutStyle } from "../../styles"

export default function LoginForm(props) {

    const [loading, setLoading] = useState(false);

    const [secure, setSecure] = useState(true);

    const { login } = useAuth();

    const toast = useToast();
    
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await loginApi(formData);
                login(response);
            } catch (error) {
                toast.show("Error al iniciar sesión, verifique los datos", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
                setLoading(false);
            }
        }
    });

    return (
        <View style={layoutStyle.container}>
            <Image style={layoutStyle.logo} source={logo} />
            <TextInput
                label="Correo electrónico"
                style={formStyle.input}
                maxLength={50}
                onChangeText={(text) => formik.setFieldValue("identifier", text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />

            <View style={styles.containerPwd}>
                <TextInput
                    label="Contraseña"
                    maxLength={40}
                    style={[formStyle.input], { width: "100%" }}
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    value={formik.values.password}
                    error={formik.errors.password}
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
                Iniciar sesión
            </Button>

            <Button
                mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={() => navigation.navigate("register")}
            >
                Registrarse
            </Button>

            <Button
                mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={() => navigation.navigate("forgot-pwd")}
            >
                ¿Olvidaste tu contraseña?
            </Button>

        </View>
    )
}

function initialValues() {
    return {
        identifier: "",
        password: ""
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
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