export interface TypeCitaDetails {
    id: string;
    date: string;
    des_or_reason: string;
    status: string;
    hour: string;
    contdr_profile: {
        users: {
            name: string
        }
        description: string;
    }
}