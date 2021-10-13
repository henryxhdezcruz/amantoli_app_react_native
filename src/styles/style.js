import colors from "./colors"

export default {

    container: {
        backgroundColor: 'white',
        flex: 1,
    },

    bgContainer: {
        backgroundColor: colors.bgDark
    },

    bgContainerLine: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.bgGray,
        paddingVertical: 10,
    },

    userContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    userImagen: {
        //width: 70,
        height: 160,
        //borderRadius: 35,
        resizeMode: "contain",
    },

    camaraContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    camaraIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: 15,
        bottom: 3
    },

    userNombre: {
        marginVertical: 10,
    },

    userTitulo: {
        textAlign: 'center',
        //fontWeight:'bold',
        fontSize: 16,
        color: colors.bgGray,
    },

    userSubTitulo: {
        textAlign: 'center',
        fontSize: 11,
        color: colors.primary,
        paddingVertical: 5,
    },

    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        marginVertical: 15,
    },

    iconoContainer: {
        flex: 1.5,
        justifyContent: 'center'
    },

    tituloContainer: {
        flex: 8.5,
        justifyContent: 'center',
        marginLeft: 15
    },

    tituloTxt: {
        fontSize: 16,
        color: colors.fontBlack,
    },

    difuminado: {
        flex: 1,
        //backgroundColor:'rgba(0, 0, 0, 0.2)'
        //backgroundColor:'rgba(0, 0, 0, 0.2)'
    },

    fondoImagen: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }
}