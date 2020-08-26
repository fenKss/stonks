import * as React from 'react';
import {Alert, Button, Modal, StyleSheet, TextInput, TouchableHighlight} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {useState} from "react";
import Stonks from "../components/Stonks/Stonks";
import ChangeStonkModal from "../components/Stonks/ChangeStonkModal";
import {StonkType} from "../types";
import EditStonkModal from "../components/Stonks/EditStonkModal";

export default function StonksScreen() {
    const [changeModalVisible, setChangeModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);


    const [stonks, setStonks] = useState([
        {
            id: 1,
            description: 'Desc',
            title: 'Title',
            summ: 1220,
            created_at: Date.now().toLocaleString()
        },
        {
            id: 2,
            description: 'Desc2',
            title: 'Title2',
            summ: 122011,
            created_at: Date.now().toLocaleString()
        }
    ]);
    const initStonk = {
        id: 0,
        description: '',
        title: '',
        summ: 0,
        created_at: Date.now().toLocaleString()
    }
    const [newStonk, changeNewStonk] = useState({...initStonk});
    const [selectedStonk, changeSelectedStonk] = useState({...initStonk});

    const editStonk = (stonk: StonkType) => {
        if (!stonk.title || !stonk.summ) {
            Alert.alert('Error', `Укажите все данные`);
            return;
        }
        if (!stonk.id) {
            changeNewStonk(newStonk);
            // @ts-ignore
            setStonks([...stonks, newStonk])
            changeNewStonk({...initStonk});
        }
    }

    const onButtonClick = () => {
        setChangeModalVisible(true);
        changeNewStonk({...initStonk});
    }
    const setupEditStonk = () => {
        changeNewStonk(selectedStonk);
        setEditModalVisible(false);
        setChangeModalVisible(true);
    }
    const deleteStonk = () => {
            const newStonks = stonks.filter(e => e.id != selectedStonk.id);
            setStonks([...newStonks]);
            setEditModalVisible(false);
    }
    const onHoldHandler = (stonk: StonkType) => {
        changeSelectedStonk(stonk);
        setEditModalVisible(true);
    }
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Stonks</Text>
                <Text style={styles.button} onPress={onButtonClick}>+</Text>
            </View>
            <ChangeStonkModal stonk={newStonk} changeModalVisible={changeModalVisible}
                              setChangeModalVisible={setChangeModalVisible} editStonk={() => {
                editStonk(newStonk)
            }}/>
            <EditStonkModal stonk={selectedStonk} modalVisible={editModalVisible} setModalVisible={setEditModalVisible}
                            editStonk={setupEditStonk} deleteStonk={deleteStonk}/>
            <Stonks stonks={stonks} onHoldHandler={onHoldHandler}/>
        </View>
    );
}

const styles = StyleSheet.create({
    top: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        padding: 10,
        paddingBottom: 20,
        borderWidth: 1,
        borderBottomColor: "#20232a",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        color: "#fff",
        paddingBottom: 10,

        borderBottomColor: "yellow",
        borderStyle: "solid",
        borderStartWidth: 1,
        width: "100%",
        textAlign: "center",
    },
    button: {
        backgroundColor: "grey",
        color: "#fff",
        fontSize: 20,
        borderRadius: 40,
        padding: 5,
    },

});
