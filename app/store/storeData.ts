import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (key: string, value: any, type: string = 'none') => {
    try {
        if (type === 'json') {
            await AsyncStorage.setItem(key, JSON.stringify(value))
        }

        await AsyncStorage.setItem(key, value)
    } catch {
        return null
    }

}