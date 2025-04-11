export interface TypeProfileContador {
    id: string;
    expertises: string[];
    pro_contact: string[];
    description: string;
    is_verified: boolean;
    user_id: string;
    users: { name: string, username: string, icon_url: string }
}