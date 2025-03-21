import AsyncStorage from "@react-native-async-storage/async-storage"

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        }
    } catch {
        return null
    }
}