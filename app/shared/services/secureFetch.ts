import { getData } from "@/app/store/getData"

type MethodsAllowed = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' 

interface SecureFetchsProps {
    options: { 
        url: string
        method: MethodsAllowed
        body?: any
        headers?: any
     }
     setLoading: (value: boolean) => void
}
/**
 * Función para hacer peticiones seguras
 * Aquí ya se maneja el envio del token al servidor para los permisos.
 * @param options 
 * @returns { response: any, error: string }
 * 
*/
export const secureFetch = async ({ options, setLoading }: SecureFetchsProps): Promise<{ response: any, error: string }> => {
    try {
        setLoading(true)
        const res = await fetch(options.url, {
            method: options.method,
            body: options.body ? JSON.stringify(options.body) : null,
            headers: {
                'Authorization': `${await getData('AuthToken')}`,
                'Content-Type': 'application/json'
            }
        })
        
        if (!res.ok) {
            const epa = await res.json()
            throw new Error(epa.error)
        }
        
        setLoading(false)
        const data = await res.json()
        return { response: data, error: '' }
    } catch (error: any) {
        console.log(error.message)
        setLoading(false)
        return { error: error.message, response: null }
    }
}