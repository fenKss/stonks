import * as React from 'react';
import {Alert, Button, Modal, StyleSheet, TextInput, TouchableHighlight} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {useState} from "react";
import Stonks from "../components/Stonks/Stonks";
import EditStonkModal from "../components/Stonks/EditStonkModal";
import {StonkType} from "../types";

export default function StonksScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const onButtonClick = () => {
        setModalVisible(true);
    }
    const [stonks, setStonks] = useState([]);

    const [newStonk, changeNewStonk] = useState({
        id:0,
        description:'',
        title:'',
        summ:0,
        created_at:Date.now().toLocaleString()
    })

    const editStonk = (stonk:StonkType) =>{
        if (!stonk.id){
            changeNewStonk(newStonk);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Stonks</Text>
                <Text style={styles.button} onPress={onButtonClick}>+</Text>
            </View>
            <EditStonkModal stonk={newStonk} modalVisible={modalVisible} setModalVisible={setModalVisible} editStonk={()=>{editStonk(newStonk)}}/>
            <Stonks stonks={stonks}/>
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
