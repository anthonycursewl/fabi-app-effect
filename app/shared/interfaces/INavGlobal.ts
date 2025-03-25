export interface INavGlobal {
    navigation: {
        navigate: (routeName: string) => void;
        goBack: () => void;
        replace: (routeName: string) => void;
    }
}