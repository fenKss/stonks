import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
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
        },
        initProfit = {
            plus: 0,
            minus: 0,
            total: 0
        }


    // const baseUrl = `https://trimere.site`,
    const baseUrl = `http://192.168.0.105:8888`,
        [changeModalVisible, setChangeModalVisible] = useState(false),
        [profit, setProfit] = useState({...initProfit}),
        [isFetching, setIsFetching] = useState(false),
        [editModalVisible, setEditModalVisible] = useState(false),
        [stonks, setStonks] = useState([]),
        [newStonk, changeNewStonk] = useState({...initStonk}),
        [selectedStonk, changeSelectedStonk] = useState({...initStonk}),
        [isRefresh, setIsRefresh] = useState(false),

        getStonksFromServer = async (): Promise<StonkType[] | void> => {
            return axios
                .get(`${baseUrl}/api/stonk`)
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
                .post(`${baseUrl}/api/stonk`, qs.stringify(data))
                .then(res => {
                    const response = res.data;
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true;
                })
                .catch((e) => {
                    throw e;
                }).finally(() => {
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
                .put(`${baseUrl}/api/stonk/${stonk.id}`, qs.stringify(data))
                .then(res => {

                    const response = res.data;
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true;
                })
                .catch((e) => {
                    throw e;
                }).finally(() => {
                    setIsFetching(false);
                })
        },
        deleteStonkOnServer = async (stonk: StonkType) => {
            setIsFetching(true);
            return axios
                .delete(`${baseUrl}/api/stonk/${stonk.id}`)
                .then(res => {

                    const response = res.data;
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true;
                })
                .catch((e) => {
                    throw e;
                }).finally(() => {
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

    useEffect(() => {
        getStonksFromServer().then(stonks => {
            //@ts-ignore
            setStonks(stonks);
        })
    }, []);

    useEffect(() => {
        profit.plus = profit.minus = profit.total = 0;
        stonks.forEach((stonk: StonkType) => {
            const summ = stonk.summ;
            profit.total += summ;
            if (summ >= 0) {
                profit.plus += summ
            } else {
                profit.minus += summ;
            }
            setProfit({...profit});
        })
    }, [stonks]);

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer} onTouchStart={onButtonClick}>
                <Text style={styles.button}>+</Text>
            </View>
            <View style={styles.top}>
                <Text style={styles.title}>Прибыль за этот месяц:<Text style={styles.plus}>{profit.plus}</Text></Text>
                <Text style={styles.title}>Убыток за этот месяц:<Text style={styles.minus}>{-profit.minus}</Text></Text>
                <Text style={styles.title}>Итого:<Text style={styles.total}>{profit.total}</Text></Text>
            </View>
            <ChangeStonkModal stonk={newStonk}
                              isFetching={isFetching}
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
        justifyContent: "center",
        flexDirection: "column",
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
        fontSize: 15,
        fontWeight: 'normal',
        marginTop: 5,
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
    buttonContainer: {
        backgroundColor: "rgb(40,33,33)",
        color: "#fff",
        borderRadius: 40,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: 5,
        width: 50,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: -15,
        zIndex: 2
    },
    button: {
        fontSize: 20,
    },
    plus:{
        fontSize: 20,
        color:"green",
    },
    minus:{
        fontSize: 20,
        color:"red",
    },
    total:{
        fontSize: 20,
        color:"grey",
    }

});
