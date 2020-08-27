import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import Stonks from "../components/Stonks/Stonks";
import ChangeStonkModal from "../components/Stonks/ChangeStonkModal";
import {StonkType} from "../types";
import EditStonkModal from "../components/Stonks/EditStonkModal";
import axios from 'axios';
import qs from "qs";

export default function StonksScreen() {
    const initStonk = {
            id: 0,
            description: '',
            title: '',
            summ: 0,
            created_at: Date.now().toLocaleString()
        };

    const [changeModalVisible, setChangeModalVisible] = useState(false),
        [isFetching, setIsFetching] = useState(false),
        [editModalVisible, setEditModalVisible] = useState(false),
        [stonks, setStonks] = useState([]),
        [newStonk, changeNewStonk] = useState({...initStonk}),
        [selectedStonk, changeSelectedStonk] = useState({...initStonk}),
        [isRefresh, setIsRefresh] = useState(false),

        getStonksFromServer = async (): Promise<StonkType[] | void> => {
            return axios
                .get(`http://192.168.0.105:8888/api/stonk`)
                .then(res => {
                    const response = res.data;
                    if (response.status.toUpperCase() != 'OK') {
                        return Alert.alert(`Ошибка`, response.error_msg);
                    }
                    const rawStonks = response.data;
                    const stonks: StonkType[] = [];
                    for (const i in rawStonks) {
                        const rawStonk = rawStonks[i];
                        const {id, description, title, created_at, summ} = rawStonk;
                        const stonk: StonkType = {
                            id, description, title, created_at, summ
                        }
                        stonks.push(stonk);
                    }

                    return stonks;
                })
                .catch((e) => {
                    throw e;
                })

        },
        addStonkToServer = async (stonk: StonkType) => {
            const data = {
                stonk
            };
            setIsFetching(true);
            return axios
                .post(`http://192.168.0.105:8888/api/stonk`, qs.stringify(data))
                .then(res => {
                    const response = res.data;
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true;
                })
                .catch((e) => {
                    throw e;
                }).finally(() =>{
                    setIsFetching(false);
                })
        },
        editStonkOnServer = async (stonk: StonkType) => {
            const data = {
                stonk
            };
            if (!stonk.id) {
                throw `Произошла внутренняя ошибка`;
            }
            setIsFetching(true);
            return axios
                .put(`http://192.168.0.105:8888/api/stonk/${stonk.id}`, qs.stringify(data))
                .then(res => {

                    const response = res.data;
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true;
                })
                .catch((e) => {
                    throw e;
                }).finally(() =>{
                    setIsFetching(false);
                })
        },
        deleteStonkOnServer = async (stonk: StonkType) => {
            setIsFetching(true);
            return axios
                .delete(`http://192.168.0.105:8888/api/stonk/${stonk.id}`)
                .then(res => {

                    const response = res.data;
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true;
                })
                .catch((e) => {
                    throw e;
                }).finally(() =>{
                    setIsFetching(false);
                })
        },

        editStonk = (stonk: StonkType) => {
            if (!stonk.title || !stonk.summ) {
                Alert.alert('Error', `Укажите все данные`);
                return;
            }
            if (!stonk.id) {
                changeNewStonk(newStonk);
                // @ts-ignore
                addStonkToServer(stonk)
                    .then(e => {
                        return getStonksFromServer().then(stonks => {
                            // @ts-ignore
                            setStonks(stonks);
                            changeNewStonk({...initStonk});
                        })

                    })
                    .catch(e => {
                        Alert.alert(`Ошибка`, e);
                    })
                    .finally(() => {
                        setChangeModalVisible(false);
                    });

            } else {
                editStonkOnServer(stonk)
                    .then(e => {
                        return getStonksFromServer().then(stonks => {
                            // @ts-ignore
                            setStonks(stonks);
                            changeNewStonk({...initStonk});
                        })

                    })
                    .catch(e => {
                        console.log(e);
                    })
                    .finally(() => {
                        setChangeModalVisible(false);
                    });
            }

        },
        deleteStonk = () => {
            deleteStonkOnServer(selectedStonk)
                .then(e => {
                    return getStonksFromServer().then(stonks => {
                        // @ts-ignore
                        setStonks(stonks);
                        changeSelectedStonk({...initStonk});
                    })

                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    setEditModalVisible(false);
                });

        },
        onButtonClick = () => {
            setChangeModalVisible(true);
            changeNewStonk({...initStonk});
        },



        onHoldHandler = (stonk: StonkType) => {
            changeSelectedStonk({...stonk});
            setEditModalVisible(true);
        },
        onRefresh = () => {
            setIsRefresh(true);

            getStonksFromServer()
                // @ts-ignore
                .then((stonks) => setStonks(stonks))
                .catch(e => {
                    if (e.message.toLowerCase() == `network error`) {
                        return Alert.alert(`Ошибка`, `Проверьте подключение к интернету`);
                    } else {
                        return Alert.alert(`Ошибка`, e.message);
                    }
                })
                .finally(() => {
                    setIsRefresh(false);
                });
        },
        setupEditStonk = () => {
            changeNewStonk(selectedStonk);
            setEditModalVisible(false);
            setChangeModalVisible(true);
        };
    useEffect(() =>{
        getStonksFromServer().then(stonks => {
            //@ts-ignore
            setStonks(stonks);
        })
    }, []);
    const ShowedStonks = () => isFetching ? <ActivityIndicator size="large" color="#00ff00" /> : <Stonks stonks={stonks} onHoldHandler={onHoldHandler} isRefreshing={isRefresh} onRefresh={onRefresh}/>;

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

            <ShowedStonks />
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
