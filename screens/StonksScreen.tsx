import * as React from 'react';
import {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import Stonks from "../components/Stonks/Stonks";
import ChangeStonkModal from "../components/Stonks/ChangeStonkModal";
import {StonkType} from "../types";
import EditStonkModal from "../components/Stonks/EditStonkModal";
import axios from 'axios';

export default function StonksScreen() {
    const initStonk = {
            id: 0,
            description: '',
            title: '',
            summ: 0,
            created_at: Date.now().toLocaleString()
        },
        initStonks = [
            {
                id: 1,
                description: 'Наконец то',
                title: 'Зарплата',
                summ: 1220,
                created_at: Date.now().toLocaleString()
            },
            {
                id: 2,
                description: 'Почему бы и нет?',
                title: 'Купил шавуху',
                summ: -122011,
                created_at: Date.now().toLocaleString()
            },
            {
                id: 3,
                description: 'Почему бы и нет?',
                title: 'Купил шавуху',
                summ: -122011,
                created_at: Date.now().toLocaleString()
            },
            {
                id: 4,
                description: 'Почему бы и нет?',
                title: 'Купил шавуху',
                summ: -122011,
                created_at: Date.now().toLocaleString()
            },
            {
                id: 5,
                description: 'Почему бы и нет?',
                title: 'Купил шавуху',
                summ: -122011,
                created_at: Date.now().toLocaleString()
            },
            {
                id: 6,
                description: 'Почему бы и нет?',
                title: 'Купил шавуху',
                summ: -122011,
                created_at: Date.now().toLocaleString()
            },
        ]

    const [changeModalVisible, setChangeModalVisible] = useState(false),
        [editModalVisible, setEditModalVisible] = useState(false),
        [stonks, setStonks] = useState(initStonks),
        [newStonk, changeNewStonk] = useState({...initStonk}),
        [selectedStonk, changeSelectedStonk] = useState({...initStonk}),
        [isRefresh, setIsRefresh] = useState(false),


        editStonk = (stonk: StonkType) => {
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
            setChangeModalVisible(false);
        },
        onButtonClick = () => {
            setChangeModalVisible(true);
            changeNewStonk({...initStonk});
        },
        setupEditStonk = () => {
            changeNewStonk(selectedStonk);
            setEditModalVisible(false);
            setChangeModalVisible(true);
        },
        deleteStonk = () => {
            const newStonks = stonks.filter(e => e.id != selectedStonk.id);
            setStonks([...newStonks]);
            setEditModalVisible(false);
        },
        onHoldHandler = (stonk: StonkType) => {
            changeSelectedStonk({...stonk});
            setEditModalVisible(true);
        },
        onRefresh = () => {
            setIsRefresh(true);
            // setStonks([]);
            // setStonks([stonks[0],...stonks]);
            axios
                .get(`https://trimere.site`)
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    Alert.alert(`Ошибка`, `Проверьте подключение к интернету`);
                })
                .finally(() => {
                    setIsRefresh(false);
                });

        };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Stonks</Text>
                <Text style={styles.button} onPress={onButtonClick}>+</Text>
            </View>
            <ChangeStonkModal stonk={newStonk}
                              changeModalVisible={changeModalVisible}
                              setChangeModalVisible={setChangeModalVisible}
                              editStonk={() => {
                                  editStonk(newStonk)
                              }}/>
            <EditStonkModal stonk={selectedStonk}
                            modalVisible={editModalVisible}
                            setModalVisible={setEditModalVisible}
                            editStonk={setupEditStonk}
                            deleteStonk={deleteStonk}/>
            <Stonks stonks={stonks} onHoldHandler={onHoldHandler} isRefreshing={isRefresh} onRefresh={onRefresh}/>
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
