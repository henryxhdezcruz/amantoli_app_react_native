import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TextInput, Button, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"
import logo from "../../../assets/logo.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../api/user";
import { Icon } from 'react-native-elements';
import { formStyle } from "../../styles";
import { useToast } from 'react-native-fast-toast'
import { layoutStyle } from "../../styles"
import colors from '../../styles/colors';
import { color } from 'react-native-elements/dist/helpers';
import { boolean } from 'yup/lib/locale';

export default function RegisterForm(props) {

    const [loading, setLoading] = useState(false);

    const [secure, setSecure] = useState(true);

    const [secureR, setSecureR] = useState(true);
    
    const [isSelected, setSelection] = useState(false);

    const toast = useToast();
    
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log(formData);
            setLoading(true);
            try {
                const response = await registerApi(formData);
                if (response.status === true) {
                    toast.show("Registrado con exito!", {
                        duration: 4000,
                        offset: 40,
                        animationType: 'zoom-in',
                    });
                    changeRegister();
                } else {
                    setLoading(false);
                    toast.show("Ya existe una cuenta con el email ingresado!", {
                        duration: 4000,
                        offset: 40,
                        animationType: 'zoom-in',
                    });
                }
            } catch (error) {
                setLoading(false);
                toast.show("Error al registrar el usuario", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
            }
        }
    });

    return (
        <View style={layoutStyle.container}>
            <Image style={layoutStyle.logo} source={logo} />

            <TextInput
                label="Nombre"
                maxLength={40}
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />

            <TextInput
                label="Correo electrónico"
                maxLength={50}
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />

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

            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={isSelected ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setSelection(!isSelected);
                        formik.setFieldValue("isChecked", isSelected)
                      }}
                    style={styles.checkbox}
                ></Checkbox>
                <Text style={styles.textcheckbox} >Aceptar todos los </Text>
                <Text style={styles.link} onPress={() => navigation.navigate("terms")}>Términos y Condiciones</Text>
            </View>

            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Registrarse
            </Button>

            <Button
                mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={() => navigation.navigate("login")}
            >
                Iniciar sesión
            </Button>

        </View>
    )
}

function initialValues() {
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
        isChecked: true
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
        isChecked: Yup.boolean().required(true).isFalse()
    };
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
    },
    textcheckbox: {
        color: colors.fontBlack,
        marginVertical: 8,
    },
    link: {
        color: colors.fontBlack,
        textDecorationLine: "underline",
        marginVertical: 8,
    },
    checkbox: {
        alignSelf: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignSelf: "center"
    },
})