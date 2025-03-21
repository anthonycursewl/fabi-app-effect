import { API_URl } from "@/app/config/api.breadriuss.config"
import { useFetch } from "@/app/shared/services/useFetch"
import { Auth } from "@/app/shared/interfaces/ContextTypes"

export const handleLogin = async (setLoading: (loading: boolean) => void, setUserToken: (token: Auth) => void, Alert: { alert: (arg0: string, arg1: string) => void; }): Promise<{ error: any } | void> => {
    try {
        const { error, data } = await useFetch({ url: `${API_URl}/auth/login`, method: 'POST' })

        if (error) {
            setLoading(false)
            Alert.alert('Error', `BRD | ${error}`)
            return { error: error }
        }

        setLoading(false)
        setUserToken({ access_token: data.access_token, refresh_token: data.refresh_token })
    } catch (error) {
        setLoading(false)
        return { error: error }
    }
}