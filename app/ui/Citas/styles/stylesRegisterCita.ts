import { StyleSheet } from "react-native"
export const stylesCitas = StyleSheet.create({
    citasMain:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        marginTop: 60,
        marginBottom: 45
    },
    decorationName: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: 'rgba(154, 101, 253, 0.91)',
        filter: 'blur(20px)',
        borderRadius: 50,
        right: '52%',
        top: '20%',
        pointerEvents: 'none',
        zIndex: -1
    },
    decorationName2:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: 'rgba(157, 175, 255, 0.91)',
        filter: 'blur(20px)',
        borderRadius: 50,
        left: '52%',
        top: '-20%',
        pointerEvents: 'none',
        zIndex: -1
    },
    headerName: {
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    registerCitas: {
        marginTop: 20,
        gap: 15
    },
    inputCitas: {
        backgroundColor: 'rgba(224, 224, 224, 0.89)',
        width: '100%',
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0.3,
        padding: 12
    }
})