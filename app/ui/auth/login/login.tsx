import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Alert } from "react-native"

// interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { AuthContext } from "@/app/shared/context/ContextProvider";

// Components
import TextWithColor from "@/app/shared/components/TextWithColor";
import { useFetch } from "@/app/shared/services/useFetch";
import { API_URl } from "@/app/config/api.breadriuss.config";

// services
import { storeData } from "@/app/store/storeData";

interface FormDataLogin {
    email: string;
    password: string;
} 

export default function Login({ navigation }: INavGlobal) {
    const [formData, setFormData] = useState<FormDataLogin>({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const { setUserToken, user } = useContext(AuthContext)

    const handleSumbit = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert('Error | Formulario incompleto', 'Por favor, el correo electrónico y contraseña son requeridos.')
            return
        }

        setLoading(true)
        const { error, data } = await useFetch({ url: `${API_URl}/auth/login`, method: 'POST', body: formData })

        if (error) {
            setLoading(false)
            Alert.alert('BRD | Error', `${error}`)
        }

        if (data) {
            setLoading(false)
            Alert.alert('BRD | Inicio de sesión', `¡Bienvenido de vuelta!`)
            setUserToken({ access_token: data.access_token, refresh_token: data.refresh_token })
            await storeData('AuthToken', data.access_token)
            navigation.replace('Dashboard')
        }
    }

    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [])

    const LogoApp = require('@/assets/images/app-logo.png') 

    return (
        <View style={styleLogin.containerMainLogin}>
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/bg-fabi-app.png?alt=media&token=b05f1d93-5108-4ed3-b670-a8bcbb25f1bc' }} style={styleLogin.decorateHeader}/>
            <View style={{ width: '88%', gap: 12, position: 'relative' }}>
                <View style={{ marginBottom: 20, alignItems: 'center', position: 'relative' }}>
                    <Image source={LogoApp} style={styleLogin.loginImg}/>
                </View>

                <View style={styleLogin.gradientLoginFace}></View>
                <View style={styleLogin.gradientLoginFace2}></View>

                <View style={styleLogin.containerInfo}>
                    <TextWithColor>Correo Electrónico</TextWithColor>
                    <TextInput placeholder="email@example.com"
                    style={styleLogin.inputAuth}
                    onChangeText={(text) => setFormData( { ...formData, email: text})}
                    value={formData.email}
                    placeholderTextColor={'gray'}
                    />

                    <TextWithColor>Contraseña</TextWithColor>
                    <TextInput placeholder="********"
                    placeholderTextColor={'gray'}
                    style={styleLogin.inputAuth}
                    onChangeText={(text) => setFormData( { ...formData, password: text })}
                    value={formData.password}
                    />
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 15 }}>
                    <TouchableOpacity style={styleLogin.buttonLogin}
                    onPress={loading ? () => {} : handleSumbit}
                    >
                        
                        <TextWithColor color="white">{loading ? 'Cargando...' : 'Iniciar Sesión'}</TextWithColor>
                    </TouchableOpacity>

                   <View style={styleLogin.goToRegister}>
                        <TextWithColor>¿No tienes una cuenta?</TextWithColor>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <TextWithColor color="#c58bdf">¡Crea una aquí!</TextWithColor>
                        </TouchableOpacity>
                   </View>
                </View>
            </View>
        </View> 
    )
}

const styleLogin = StyleSheet.create({
    containerMainLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    containerInfo: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        gap: 12
    },
    inputAuth: {
        backgroundColor: 'rgb(224, 224, 224)',
        width: '100%',
        borderRadius: 18,
        borderColor: 'gray',
        borderWidth: 0.3,
        padding: 12,
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
    decorationImg: {
        width: 150,
        height: 150,
        opacity: 0.5,
        zIndex: -1,
        top: -20,
        borderRadius: 100,
        transform: [{ rotate: '10deg' }],
        position: 'absolute'
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