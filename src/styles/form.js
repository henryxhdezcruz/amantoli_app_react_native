import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
    input: {
        marginBottom: 20,
    },
    btnSuccess: {
        padding: 5,
        backgroundColor: colors.bgDark,
    },
    btnText: {
        marginTop: 10,
    },
    btnTextLabel: {
        color: colors.bgDark
    }
});

export default formStyles;