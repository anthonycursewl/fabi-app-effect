import { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native"

// interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import TextWithColor from "@/app/shared/components/TextWithColor";

interface FormDataLogin {
    email: string;
    password: string;
    username: string;
    name: string;
} 

export default function Register({ navigation }: INavGlobal) {
    const [formData, setFormData] = useState<FormDataLogin>({
        email: '',
        password: '',
        username: '',
        name: '',
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleSumbit = () => {
        if (!formData.email || !formData.password) {
            console.log('Formulario incompleto');
            Alert.alert('Formulario incompleto', 'Por favor, complete todos los campos del formulario.')
            return
        }

        console.log(formData)
        Alert.alert('Formulario enviado', 'El formulario se ha enviado correctamente')
    }

    return (
        <View style={styleRegister.containerMainLogin}>
            <Image source={{ uri: 'https://www.pngall.com/wp-content/uploads/12/Lines-PNG-HD-Image.png' }} style={styleRegister.decorateHeader}/>
            <View style={{ width: '88%', gap: 12, position: 'relative' }}>
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-lA3eL9lLTxnBpLD80c5DQMkK2aviC2EXQ&s' }} style={styleRegister.loginImg}/>
                </View>

                <View style={styleRegister.gradientLoginFace}></View>
                <View style={styleRegister.gradientLoginFace2}></View>

                <View style={styleRegister.containerInfo}>
                    <TextWithColor>Nombres</TextWithColor>
                    <TextInput placeholder="Primer nombre Segundo nombre..."
                    style={styleRegister.inputAuth}
                    onChangeText={(text) => setFormData( { ...formData, name: text})}
                    value={formData.name}
                    />

                    <TextWithColor>Nombre de Usuario</TextWithColor>
                    <TextInput placeholder="example.cuenta"
                    style={styleRegister.inputAuth}
                    onChangeText={(text) => setFormData( { ...formData, username: text})}
                    value={formData.username}
                    />

                    <TextWithColor>Email</TextWithColor>
                    <TextInput placeholder="example@example.com"
                    style={styleRegister.inputAuth}
                    onChangeText={(text) => setFormData( { ...formData, email: text })}
                    value={formData.email}
                    />

                    <TextWithColor>Contraseña</TextWithColor>
                    <TextInput placeholder="********"
                    style={styleRegister.inputAuth}
                    onChangeText={(text) => setFormData( { ...formData, password: text })}
                    value={formData.password}
                    />
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 15 }}>
                    <TouchableOpacity style={styleRegister.buttonLogin}
                    onPress={handleSumbit}
                    >
                        <TextWithColor color="white">Registrarme</TextWithColor>
                    </TouchableOpacity>

                   <View style={styleRegister.goToRegister}>
                        <TextWithColor>¿Ya tienes una cuenta?</TextWithColor>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <TextWithColor color="#c58bdf">Inicia sesión aquí!</TextWithColor>
                        </TouchableOpacity>
                   </View>
                </View>
            </View>
        </View> 
    )
}

const styleRegister = StyleSheet.create({
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
        borderRadius: 60,
        zIndex: 1,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
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