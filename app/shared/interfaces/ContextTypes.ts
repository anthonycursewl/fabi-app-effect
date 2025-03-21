import { User } from "./User"

export interface ICType {
    userToken: Auth
    setUserToken: (type: Auth) => void
    user: User
    setUser: (type: User) => void
}

export interface Auth {
    access_token: string
    refresh_token: string
}