export type State = {
    stonksScreen: StonksScreenProps;
};
export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
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