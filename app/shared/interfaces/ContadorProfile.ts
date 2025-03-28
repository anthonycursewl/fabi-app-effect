import { User } from "./User";

export interface ContadorProfileData {
    id: string;
    description: string;
    is_verified: string;
    users: User;
}
