import * as React from 'react';
import {Alert, Button, StyleSheet, TextInput} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {useState} from "react";
import Stonk from "../components/Stonk";
import Stonks from "../components/Stonks";

export default function TabOneScreen() {
    const inputRef = React.createRef();

    const [stonks, setStonks] = useState([]);
    const [value, setValue] = useState('');
    const onButtonClick = () => {
        value.trim() ? addStonk(value) : Alert.alert(`ad`, `asd`);
    }

    const addStonk = (title: string) => {
        const newStonk = {
            id: Date.now().toString(),
            summ: title,
            date: Date.now().toLocaleString()
        }
        // @ts-ignore
        setStonks(prev => [...prev, newStonk]);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <TextInput onChangeText={text => setValue(text)} value={value} style={styles.input}/>
            <Button style={styles.button} title="add" onPress={onButtonClick}></Button>
            <Stonks stonks={stonks}/>
        </View>
    );
}

const styles = StyleSheet.create({
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
        color: "#fff"
    },

});
