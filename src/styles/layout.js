import { StyleSheet } from "react-native"

const layoutStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginBottom: 40
    },
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
});

export default layoutStyle;