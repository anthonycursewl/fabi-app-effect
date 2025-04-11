import { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native"

// interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import TextWithColor from "@/app/shared/components/TextWithColor";

// Styles
import { styleRegister } from "./styles/stylesRegister";
import { useFetch } from "@/app/shared/services/useFetch";
import { API_URl } from "@/app/config/api.breadriuss.config";

// Services 
import { generatorUID } from "@/app/shared/services/UUIDGenerator";
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles";
import { ICON_DEFAULT } from "@/app/shared/constants/TypesIconUsers";

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

    const handleSumbit = async () => {
        if (!formData.email || !formData.password || !formData.username || !formData.name) {
            console.log('Formulario incompleto');
            Alert.alert('Formulario incompleto', 'Por favor, complete todos los campos del formulario.')
            return
        }

        setLoading(true)
        console.log(formData)
        const { error, data } = await useFetch({ url: `${API_URl}/user/save`, method: 'POST', body: {
            id: generatorUID(),
            username: formData.username,
            email: formData.email,
            password: formData.password,
            name: formData.name,
            role: TYPES_ROLES.USER,
            created_at: new Date().toISOString(),
            icon_url: ICON_DEFAULT
        }})

        if (error) {
            setLoading(false)
            Alert.alert('BRD | Error', `${error}`)
        }

        if (data) {
            setLoading(false)
            Alert.alert('BRD | Registro', `¡Bienvenido ${formData.name}, ya puedes iniciar sesión!`)
            setFormData({ email: '', password: '', username: '', name: '' })
            navigation.replace('Login')
        }
    }

    const LogoApp = require('@/assets/images/app-logo.png')

    return (
        <View style={styleRegister.containerMainLogin}>
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/bg-fabi-app.png?alt=media&token=b05f1d93-5108-4ed3-b670-a8bcbb25f1bc' }} style={styleRegister.decorateHeader}/>
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
                    onChangeText={(text) => setFormData( { ...formData, name: text })}
                    value={formData.name}
                    />

                    <TextWithColor>Nombre de Usuario</TextWithColor>
                    <TextInput placeholder="example.cuenta"
                    style={styleRegister.inputAuth}
                    onChangeText={(text) => setFormData( { ...formData, username: text.toLowerCase().trim() })}
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
                    {!loading ? <TouchableOpacity style={styleRegister.buttonLogin}
                    onPress={handleSumbit}
                    >
                        <TextWithColor color="white">Registrarme</TextWithColor>
                    </TouchableOpacity> : <ActivityIndicator size="large" color="#c58bdf" />}

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

