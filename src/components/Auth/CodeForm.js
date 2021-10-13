import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"
import logo from "../../../assets/logo.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import { readCode } from "../../api/send_email";
import { formStyle } from "../../styles";
import { useToast } from 'react-native-fast-toast';
import { layoutStyle } from "../../styles"

export default function CodeForm(props) {

    const { route } = props;

    const { params } = route;

    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);

            const code = await readCode(params.email);

            if (code.code_to_reset_pass === formData.code) {
                setLoading(false);
                toast.show("Código de verificación valido", {
                        duration: 4000,
                        offset: 40,
                        animationType: 'zoom-in',
                });
                navigation.navigate("reset-pwd", {
                    email: params.email
                });
            } else {
                setLoading(false);
                toast.show("Código de verificación no valido", {
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
                label="Ingresa el código de verificación"
                maxLength={6}
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("code", text)}
                value={formik.values.code}
                error={formik.errors.code}
                keyboardType='numeric'
            />

            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                validar código
            </Button>

            <Button
                mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={() => navigation.navigate("login")}
            >
                cancelar
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        code: "",
    }
}

function validationSchema() {
    return {
        code: Yup.string().min(5, true).max(6, true).required(true)
    };
}