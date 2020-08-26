export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};

export type TabOneParamList = {
    TabOneScreen: undefined;
};

export type TabTwoParamList = {
    TabTwoScreen: undefined;
};
export type StonkType = {
    id: number,
    title: string,
    description: string,
    summ: number,
    created_at: string
};
export type ModalProps = {
    isOpen: boolean;
    children: React.ReactNode;
    close: () => void;
};