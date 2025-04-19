export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: string;
    role: string;
    name: string;
    iat: number;
    exp: number;
    jti: string;
}


export interface IUserProfile extends Omit<User, 'password' | 'iat' | 'exp' | 'jti'> {
    icon_url: string;
}
