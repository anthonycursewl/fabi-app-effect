
import { create } from "zustand";

interface IGlobalState {
    SuMarroz: string
}

export const useGlobalState = create<IGlobalState>((_set) => ({
    SuMarroz: '',
}));