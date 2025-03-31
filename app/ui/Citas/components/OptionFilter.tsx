import TextWithColor from "@/app/shared/components/TextWithColor"
import { TouchableOpacity } from "react-native"

export const OptionFilter = ({ item }: { item: string }) => {
    return (
        <TouchableOpacity style={{ backgroundColor: 'rgb(221, 221, 221)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12, height: 'auto' }}>
            <TextWithColor style={{ fontSize: 12 }}>{item}</TextWithColor>
        </TouchableOpacity>
    )
}
