import React, {useState} from "react";
import {View, Text, StyleSheet, Modal, Alert, TouchableHighlight, TextInput} from "react-native";
import {StonkType} from "../../types";

type Props = {
    modalVisible: boolean,
    setModalVisible: (isVisible: boolean) => void,
    editStonk: () => void
    deleteStonk: () => void,
    stonk: StonkType
}
const EditStonkModal = (props: Props) => {
    let {setModalVisible, modalVisible, editStonk, deleteStonk, stonk} = props;
    const [myWidth, setWidth] = useState(1);
    const [myHeight, setHeight] = useState(1);

    const onLayout = event => {
        const {width, height} = event.nativeEvent.layout;

        setWidth(width);
        setHeight(height);
    };

    return (
        <Modal
            // animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.container}>
                <View style={styles.shadow} onTouchStart={() => {
                    setModalVisible(!modalVisible);
                }}>

                </View>
                <View onLayout={onLayout} style={{
                    ...styles.content,
                    translateX: -(myWidth / 2),
                    translateY: -(myHeight / 2),
                }}>
                    <View style={styles.top}><Text style={styles.summ}> {stonk.title}</Text></View>
                    <View style={styles.mid}>
                        <TouchableHighlight onPress={editStonk} style={styles.button}>
                            <Text>Изменить</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={deleteStonk} style={styles.button}>
                            <Text>Удалить</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )
};
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        padding: 10,
        backgroundColor: "#1d1d1d",
        borderWidth: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        position: "absolute",
        top: "50%",
        left: "50%",

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
    top: {},
    close: {
        fontSize: 20,
        color: "#fff",
    },
    title: {
        fontSize: 20,
        color: "#fff",
    },
    mid: {
        // marginTop:10,
        // padding:10,
        // flex:1,
        // alignItems:"flex-start",
    },
    titleInput: {
        fontSize: 15,
        padding: 10,
        color: "#fff",
        width: "100%"
    },

    description: {
        color: "#fff",
        padding: 10,
        width: "100%"
    },
    button: {
        marginTop: 20,
        color: "#fff",
        padding: 10,
        backgroundColor: "#fff",
    }
});

export default EditStonkModal;