import AsyncStorage from "@react-native-async-storage/async-storage"
export const removeItem = async (key: string) => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (error) {
        return null
    }
}