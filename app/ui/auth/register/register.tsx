import { useContext, useState } from "react";
import { StyleSheet, Text, View, 
TextInput, TouchableOpacity, 
Image, Alert, 
ActivityIndicator, 
SafeAreaView, ScrollView, 
KeyboardAvoidingView, Platform, Keyboard } from "react-native"

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
    confirmPassword: string;
} 

export default function Register({ navigation }: INavGlobal) {
    const [formData, setFormData] = useState<FormDataLogin>({
        email: '',
        password: '',
        username: '',
        name: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleSumbit = async () => {
        if (!formData.email || !formData.password || !formData.username || !formData.name) {
            console.log('Formulario incompleto');
            Alert.alert('Formulario incompleto', 'Por favor, complete todos los campos del formulario.')
            return
        }

        if (formData.confirmPassword !== formData.password) {
            console.log('Las contraseñas no coinciden');
            Alert.alert('BRD | Error', 'Las contraseñas no coinciden!')
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
            setFormData({ email: '', password: '', username: '', name: '', confirmPassword: '' })
            navigation.replace('Login')
        }
    }

    const LogoApp = require('@/assets/images/app-logo.png')

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 20
                    }}
                >
                    <View style={styleRegister.containerMainLogin}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', gap: 5, marginTop: 20 }}>
                            <View style={styleRegister.gradientLoginFace}></View>
                            <View style={styleRegister.gradientLoginFace2}></View>
                            <Image source={LogoApp} style={styleRegister.loginImg}/>
                        </View>

                    <View style={{ width: '90%', gap: 25 }}>
                        <View style={{ gap: 5 }}>
                            <TextWithColor style={{ fontSize: 14, color: 'rgb(102, 102, 102)' }}>Nombres</TextWithColor>
                            <TextInput
                                placeholder="Ingresa tu nombre..."
                                style={styleRegister.inputAuth}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                                value={formData.name}
                            />
                        </View>

                        <View style={{ gap: 5 }}>
                            <TextWithColor style={{ fontSize: 14, color: 'rgb(102, 102, 102)' }}>Nombre de usuario</TextWithColor>
                            <TextInput
                                placeholder="Ingresa tu nombre de usuario..."
                                style={styleRegister.inputAuth}
                                onChangeText={(text) => setFormData({ ...formData, username: text.toLowerCase().trim() })}
                                value={formData.username}
                            />
                        </View>

                        <View style={{ gap: 5 }}>
                            <TextWithColor style={{ fontSize: 14, color: 'rgb(102, 102, 102)' }}>Correo Electrónico</TextWithColor>
                            <TextInput
                                placeholder="Ingresa tu correo electrónico..."
                                style={styleRegister.inputAuth}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                value={formData.email}
                            />
                        </View>

                         <View style={{ gap: 5 }}>
                            <TextWithColor style={{ fontSize: 14, color: 'rgb(102, 102, 102)' }}>Contraseña</TextWithColor>
                            <TextInput
                                placeholder="Ingresa tu contraseña..."
                                style={styleRegister.inputAuth}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                value={formData.password}
                                secureTextEntry
                            />
                        </View>

                        <View style={{ gap: 5 }}>
                            <TextWithColor style={{ fontSize: 14, color: 'rgb(102, 102, 102)' }}>Confirmar Contraseña</TextWithColor>
                            <TextInput
                                placeholder="Confirma tu contraseña..."
                                style={styleRegister.inputAuth}
                                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                                value={formData.confirmPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 25 }}>
                        {!loading ? 
                            <TouchableOpacity style={styleRegister.buttonLogin}
                            onPress={loading ? () => {} : handleSumbit}
                            >
                                <TextWithColor color="white">Registrarse</TextWithColor>
                            </TouchableOpacity>
                            : 
                            <ActivityIndicator color="rgb(169, 76, 255)" size={'small'}/>
                            }

                        <View style={styleRegister.goToRegister}>
                            <TextWithColor style={{ fontSize: 12 }}>¿Ya tienes una cuenta?</TextWithColor>
                            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                                <TextWithColor color="#c58bdf" style={{ fontSize: 12 }}>¡Inicia sesión aquí!</TextWithColor>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
            <View style={{ height: 20 }} />
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
