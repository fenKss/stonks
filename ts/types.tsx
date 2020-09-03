export type State = {
    stonksScreen: StonksScreenProps;
};
export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
    Auth: undefined
};

export type BottomTabParamList = {
    Stonks: undefined;
    Debts: undefined;
};

export type TabOneParamList = {
    Stonks: undefined;
};

export type TabTwoParamList = {
    Debts: undefined;
};
export type StonkType = {
    id: number,
    title: string,
    description: string,
    summ: number,
    created_at: string
};
export type StonksScreenProps = {
    navigation:any,
    newStonk: StonkType,
    selectedStonk: StonkType,
    stonks: StonkType[],
    updateStonks: () => void,
    editStonk: (stonk:StonkType) => Promise<any>,
    deleteSelectedStonk: () => Promise<any>,
    setStonks: (stonks:StonkType[]) => void,
    setNewStonk: (stonk:StonkType) => void,
    setSelectedStonk: (stonk:StonkType) => void,
};

export type AuthScreenProps = {
    login:string,
    password:string,
    isAuthed:boolean
}
export const TOKEN_HEADER = "X-AUTH-TOKEN";
export const TOKEN_STORAGE = "stonksAuthToken";