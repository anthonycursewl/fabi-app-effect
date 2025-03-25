import { getData } from "@/app/store/getData"

interface SecureFetchsProps {
    options: { 
        url: string
        method: string
        body?: any
        headers?: any
     }
     setLoading: (value: boolean) => void
}

export const secureFetch = async ({ options, setLoading }: SecureFetchsProps) => {
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
        return { response: data }
    } catch (error: any) {
        console.log(error.message)
        setLoading(false)
        return { error: error.message }
    }
}