export interface INavGlobal {
    navigation: {
        navigate: (routeName: string, params?: any) => void;
        goBack: () => void;
        replace: (routeName: string) => void;
        params: any
    }
}