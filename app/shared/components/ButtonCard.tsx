import { TouchableOpacity, View, Image } from "react-native"
import TextWithColor from "./TextWithColor"

export function ButtonCard({ icon, name, namePath, currentPath }: { icon: any, name: string, namePath: string, currentPath: string }) {
    return (
        <TouchableOpacity style={currentPath === namePath ? { opacity: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(176, 134, 255, 0.66)' } : { opacity: 0.7 }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image source={icon} style={{ width: 25, height: 25 }} />
                <TextWithColor style={{ fontSize: 10, color: 'rgba(29, 29, 29, 0.66)' }}>{name}</TextWithColor>
            </View>
        </TouchableOpacity>
    )
}