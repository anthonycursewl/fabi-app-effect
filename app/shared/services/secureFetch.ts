import { getData } from "@/app/store/getData"

type MethodsAllowed = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' 

interface SecureFetchsProps {
    options: { 
        url: string
        method: MethodsAllowed
        body?: any
        headers?: any
     }
     setLoading: (value: boolean) => void;
     singal?: AbortSignal
}
/**
 * Función para hacer peticiones seguras
 * Aquí ya se maneja el envio del token al servidor para los permisos.
 * @param options 
 * @param setLoading
 * @param signal
 * @returns {Promise<{ response: any, error: string }>}
 * 
*/
export const secureFetch = async ({ options, setLoading, singal }: SecureFetchsProps): Promise<{ response: any, error: string }> => {
    try {
        setLoading(true)
        const AuthToken = await getData('AuthToken')
        const res = await fetch(options.url, {
            method: options.method,
            body: options.method !== 'GET' && options.body ? JSON.stringify(options.body) : null,
            headers: {
                'Authorization': `${AuthToken}`,
                'Content-Type': 'application/json'
            },
            signal: singal
        })
        
        let data;
        try {
            data = await res.json();
        } catch (e) {
            throw new Error(`El servidor ha respondido con un error: Status${res.status}`)
        }

        if (!res.ok) {
            throw new Error(data.error || data.message || 'Error en la petición');
        }
        
        setLoading(false)
        return { response: data, error: '' }
    } catch (error: any) {
        console.log(error.message)
        setLoading(false)
        if (error.message === 'Failed to fetch') {
            return { error: 'No se pudo conectar con el servidor', response: null }
        }

        if (error.name === 'AbortError') {
            return { error: '¡Operación cancelada!', response: null }
        } 

        return { error: error.message, response: null }
    }
}