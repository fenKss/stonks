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