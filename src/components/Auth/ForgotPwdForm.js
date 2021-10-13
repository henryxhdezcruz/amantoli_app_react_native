import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"
import logo from "../../../assets/logo.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendEmail, readEmail, saveCode } from "../../api/send_email"
import { formStyle } from "../../styles";
import { useToast } from 'react-native-fast-toast'
import random from 'random'
import { layoutStyle } from "../../styles"

export default function ForgotPwdForm(props) {

    const [loading, setLoading] = useState(false);

    const toast = useToast();
    
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);

            
            const existe = await readEmail(formData);

            if (existe === null) {
                setLoading(false);
                    toast.show("No existe ninguna cuenta con el correo proporcionado", {
                        duration: 4000,
                        offset: 40,
                        animationType: 'zoom-in',
                });
            } else {
                const code = random.int(100000,999999);
                const responsecode = await saveCode(formData.email, code);
                const response = await sendEmail(formData, code, existe.name);

                if (response == null) {
                    setLoading(false);
                    toast.show("Error al recuperar contraseña", {
                        duration: 4000,
                        offset: 40,
                        animationType: 'zoom-in',
                    });
                } else {
                    setLoading(false);
                    toast.show("Se envió un código al correo proporcionado para la recuperacion de contraseña", {
                        duration: 4000,
                        offset: 40,
                        animationType: 'zoom-in',
                    });
                    navigation.navigate("code-form", {
                        email: formData.email
                    });
                }

            }
        }
    });

    return (
        <View style={layoutStyle.container}>
            <Image style={layoutStyle.logo} source={logo} />
            <TextInput
                label="Correo electrónico"
                maxLength={50}
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />

            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Recuperar contraseña
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
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true)
    };
}