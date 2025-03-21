import { TouchableOpacity, View, Image } from "react-native"
import TextWithColor from "./TextWithColor"

export function ButtonCard({ icon, name }: { icon: any, name: string }) {
    return (
        <TouchableOpacity>
            <View>
                <Image source={icon} style={{ width: 28, height: 28 }} />
                <TextWithColor style={{ fontSize: 13 }}>{name}</TextWithColor>
            </View>
        </TouchableOpacity>
    )
}