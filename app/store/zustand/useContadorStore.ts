import { API_URl } from "@/app/config/api.breadriuss.config";
import { secureFetch } from "@/app/shared/services/secureFetch";
import { TypeProfileContador } from "@/app/ui/Profile/interfaces/TypeProfileContador";
import { create } from "zustand";

interface ContadorState {
    profileCont: TypeProfileContador;
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setProfileCont: (profileCont: TypeProfileContador) => void;
    getProfileCont: (contId: string) => Promise<void>;
}

export const useContadorStore = create<ContadorState>((set, get) => ({
    profileCont: {
        id: "",
        expertises: [],
        pro_contact: [],
        description: "",
        is_verified: false,
        user_id: "",
        users: { name: "", username: "", icon_url: "" }
    },
    loading: false,
    error: null,
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    setProfileCont: (profileCont: TypeProfileContador) => set({ profileCont }),
    getProfileCont: async (contId: string): Promise<void> => {
        const { setLoading, setError, setProfileCont } = get()
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/profile/${contId}`,
                method: 'GET'
            },
            setLoading
        })

        if (error) {
            setError(error)
            return;
        }

        if (response) {
            setProfileCont(response)
        }
    }
}));