interface IFetchProps {
    url: string
    method: string
    body?: any
    headers?: any
}

export const useFetch = async ({ url, method, body, headers }: IFetchProps) => {
    try {
        const response = await fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json'
            }
        })
         
        if (!response.ok) {
            const res = await response.json()
            throw new Error(res.error)
        }

        const data = await response.json()
        return { data: data }
    } catch (error: any) {
        return { error: error.message }
    }
}