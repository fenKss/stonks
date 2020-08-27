import React, {useEffect, useState} from "react";
import {ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {StonkType} from "../../types";

type Props = {
    changeModalVisible: boolean,
    setChangeModalVisible: (isVisible: boolean) => void,
    stonk: StonkType,
    editStonk: () => void,
    isFetching: boolean
}
const ChangeStonkModal = (props: Props) => {
    let {setChangeModalVisible, changeModalVisible, stonk, editStonk, isFetching} = props;
    const [title, setTitle] = useState(stonk.title);
    const [description, setDescription] = useState(stonk.description);
    const [summ, setSumm] = useState(+stonk.summ ?? '');

    const onTitleChange = (text: string) => {
        stonk.title = text;
        setTitle(text);
    }
    const onDescriptionChange = (text: string) => {
        stonk.description = text;
        setDescription(text);
    }
    const onSummChange = (text: string) => {
        let sum = +text;
        if (text === `` || !isNaN(sum)) {
            // @ts-ignore
            setSumm(text);
            stonk.summ = sum;
        } else if (text === "-") {
            stonk.summ = 0;
            // @ts-ignore
            setSumm(text);
        }

    }
    useEffect(() => {
        //@ts-ignore
        setSumm(+stonk.summ || '');
        setDescription(stonk.description);
        setTitle(stonk.title);
    }, [stonk]);
    const Content = () =>
        isFetching ?

            <ActivityIndicator size="large" color="#00ff00"/>

            :
            <>
                <TextInput style={styles.titleInput} value={title} placeholder={'Название'}
                           onChangeText={onTitleChange}/>
                <TextInput style={styles.description} value={description} placeholder={'Описание'}
                           onChangeText={onDescriptionChange}/>
                <TextInput keyboardType={"numeric"} style={styles.description} value={summ.toString()}
                           placeholder={'Сумма'} onChangeText={onSummChange}/>
                <TouchableHighlight onPress={editStonk} style={styles.button}>
                    <Text>{stonk.id ? "Изменить" : "Добавить"}</Text>
                </TouchableHighlight>
            </>


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={changeModalVisible}
        >
            <View style={styles.container}>
                <View style={styles.shadow} onTouchStart={() => {
                    setChangeModalVisible(!changeModalVisible);
                }}/>
                <View style={styles.content}>
                    <View style={styles.top}>
                        <Text style={styles.title}>{stonk.id ? "Изменить" : "Добавить"} stonk</Text>
                        <TouchableHighlight
                            onPress={() => {
                                setChangeModalVisible(!changeModalVisible);
                            }}
                        >
                            <Text style={styles.close}>X</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.mid}>
                        <Content/>
                    </View>
                </View>
            </View>
        </Modal>
    )
};
export default ChangeStonkModal;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    shadow: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    content: {
        backgroundColor: "#1d1d1d",
        borderWidth: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    date: {
        fontSize: 10,
        color: "grey"
    },
    summ: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    },
    top: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        paddingTop: 15

    },
    close: {
        fontSize: 25,
        color: "#fff",
    },
    title: {
        fontSize: 20,
        color: "#fff",
    },
    mid: {
        marginTop: 10,
        padding: 10,
        flex: 1,
        alignItems: "flex-start",
    },
    titleInput: {
        fontSize: 15,
        padding: 10,
        paddingBottom: 5,
        paddingLeft: 5,
        color: "#fff",
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.2)"
    },

    description: {
        color: "#fff",
        padding: 10,
        paddingBottom: 5,
        paddingLeft: 5,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.2)"
    },
    button: {
        marginTop: 20,
        color: "#fff",
        padding: 10,
        backgroundColor: "#fff",
    }
});