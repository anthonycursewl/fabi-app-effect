import TextWithColor from "@/app/shared/components/TextWithColor"
import { TouchableOpacity } from "react-native"

export const OptionFilter = ({ item, setFilter, filter }: { item: { name: string, value: string }, setFilter: (filter: string) => void, filter: string }) => {
    return (
        <TouchableOpacity style={{ 
            backgroundColor: filter === item.value ? 'rgb(225, 193, 253)' : 'rgb(221, 221, 221)', 
            paddingVertical: 5, 
            paddingHorizontal: 10, 
            borderRadius: 12, 
            height: 'auto' 
        }}
        onPress={() => {
            item.value === filter ? null : setFilter(item.value)
        }}
        >
            <TextWithColor style={{ fontSize: 12 }}>{item.name}</TextWithColor>
        </TouchableOpacity>
    )
}
