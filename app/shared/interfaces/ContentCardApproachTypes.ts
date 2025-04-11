import { INavGlobal } from "./INavGlobal";

type TypeNotes = ['info', 'success', 'warning', 'error']
export interface ContentCardTypes {
    title: string;
    description: string;
    button?: {
        text: string;
        onPress: () => void;
    }
    note?: {
        text: string;
        type: string | TypeNotes
    }
    isEnd?: boolean,
    icon: string
    navigation?: INavGlobal
}