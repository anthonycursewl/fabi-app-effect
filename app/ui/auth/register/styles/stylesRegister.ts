import { StyleSheet } from "react-native"
export const styleRegister = StyleSheet.create({
    containerMainLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 100,
        flexGrow: 1,
    },
    containerInfo: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        gap: 12,
        flexGrow: 1,
    },
    inputAuth: {
        backgroundColor: 'rgba(224, 224, 224, 0.89)',
        width: '100%',
        borderRadius: 18,
        borderColor: 'gray',
        borderWidth: 0.3,
        padding: 12
    },
    buttonLogin: {
        borderRadius: 18,
        backgroundColor: '#c58bdf',
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    }, 
    gradientLoginFace: {
        position: 'absolute',
        width: 120,
        height: 85,
        backgroundColor: '#658fff',
        borderRadius: 50,
        opacity: 1,
        filter: 'blur(50px)',
        left: 30,
        top: 35
    },
    gradientLoginFace2: {
        position: 'absolute',
        width: 180,
        height: 100,
        backgroundColor: '#aa4efc',
        borderRadius: 50,
        filter: 'blur(50px)',
        right: 10,
        top: -25
    },
    loginImg: {
        width: 110,
        height: 110,
        zIndex: 1,
        filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))'
    },
    goToRegister: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5, 
        textDecorationColor: 'black',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    },
    decorateHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        objectFit: 'cover',
        height: '100%',
        opacity: 0.05,
        zIndex: -1,
        pointerEvents: 'none'
    }
})