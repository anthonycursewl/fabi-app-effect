
import { IUserProfile } from "@/app/shared/interfaces/User";
import { create } from "zustand";

interface IGlobalState {
    user: IUserProfile, 
    setUser: (user: IUserProfile) => void
}

export const useGlobalState = create<IGlobalState>((_set) => ({
    user: { 
        id: '', username: '', 
        email: '', password: '', 
        created_at: '', role: '', 
        name: '', icon_url: '' 
    },
    setUser: (user: IUserProfile) => _set({ user })
}));