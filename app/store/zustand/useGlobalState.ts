import { API_URl } from "@/app/config/api.breadriuss.config";
import { secureFetch } from "@/app/shared/services/secureFetch";
import { create } from "zustand";

interface IGlobalState {
    SuMarroz: string
}

export const useGlobalState = create<IGlobalState>((_set) => ({
    SuMarroz: '',
}));