import { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native"

// interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import TextWithColor from "@/app/shared/components/TextWithColor";

// Styles
import { styleRegister } from "./styles/stylesRegister";

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

    const LogoApp = require('@/assets/images/app-logo.png')

    return (
        <View style={styleRegister.containerMainLogin}>
            <Image source={{ uri: 'https://www.pngall.com/wp-content/uploads/12/Lines-PNG-HD-Image.png' }} style={styleRegister.decorateHeader}/>
            <View style={{ width: '88%', gap: 12, position: 'relative' }}>
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <Image source={LogoApp} style={styleRegister.loginImg}/>
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

