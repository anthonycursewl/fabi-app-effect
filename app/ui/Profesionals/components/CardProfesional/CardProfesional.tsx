import { TypeProfileContador } from "@/app/ui/Profile/interfaces/TypeProfileContador"
import { View, Image, TouchableOpacity } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { styleProfesionals } from "../../styles/styleProfesionals"

// services
import { handleCopyToClipboard } from "@/app/shared/services/coyToClipboard"

export const CardProfesional = ({ item, setShowModalSucess }: { item: TypeProfileContador, setShowModalSucess: (value: boolean) => void }): JSX.Element => {
    const maxLineLimit = 14

    return (
        <View style={styleProfesionals.cardProfesional}>
            <View style={styleProfesionals.infoProfesional}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={{ uri: item.users.icon_url }}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    />

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <TextWithColor style={{ fontSize: 16 }}>{item.users.name}</TextWithColor>
                            {item.is_verified && <Image source={require('@/assets/images/verified-contador-img.png')}
                            style={{ width: 19, height: 19 }} 
                            />}
                        </View>

                        <TextWithColor color="gray">@{item.users.username}</TextWithColor>
                    </View>
                </View>
                <TextWithColor style={{ fontSize: 15 }}>{item.description}</TextWithColor>
            </View>

            <View style={{ gap: 5 }}>
                <TextWithColor>Especialidades</TextWithColor>
                <View style={styleProfesionals.expertisesProfesional}>
                    {item.expertises.map((expertise, index) => (
                        <TextWithColor key={index} style={styleProfesionals.contExpertises}>{expertise}</TextWithColor>
                    ))}
                </View>
            </View>

            <View style={{ gap: 5 }}>
                <TextWithColor>Medios de Contacto</TextWithColor>
                <View style={styleProfesionals.contactProfesional}>
                    {item.pro_contact.map((contact, index) => (
                        <TouchableOpacity style={styleProfesionals.contContact} onPress={() => handleCopyToClipboard(contact, setShowModalSucess)}>
                            <TextWithColor key={index}
                            >{contact.slice(0, maxLineLimit) + '...'}</TextWithColor>
                            <Image source={require('@/assets/images/copy-all.png')} style={{ width: 15, height: 15 }}/>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View>
                <TouchableOpacity style={styleProfesionals.btnVerPerfil}>
                    <TextWithColor style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>Ver Perfil</TextWithColor>
                </TouchableOpacity>
            </View>
        </View>
    )
}