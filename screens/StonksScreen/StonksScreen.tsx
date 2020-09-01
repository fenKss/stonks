import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import Stonks from "../../components/Stonks/Stonks";
import ChangeStonkModal from "../../components/Stonks/ChangeStonkModal";
import {StonksScreenProps, StonkType} from "../../ts/types";
import EditStonkModal from "../../components/Stonks/EditStonkModal";
import Logout from "../../components/Logout";

export default function StonksScreen(props: StonksScreenProps) {

    const initProfit = {
        plus: 0,
        minus: 0,
        total: 0
    }
    const initStonk: StonkType = {
        created_at: "", description: "", id: 0, summ: 0, title: ""
    }
    const {
        editStonk,
        deleteSelectedStonk,
        updateStonks,
        stonks,
        selectedStonk,
        newStonk,
        setSelectedStonk,
        setNewStonk
    } = props;
    const onEditStonk = (stonk: StonkType) => {
        editStonk(stonk)
            .then(() => {
                setChangeModalVisible(false);
            })
            .catch(e => {
                Alert.alert(`Ошибка`, e);
            })
    }
    const
        [changeModalVisible, setChangeModalVisible] = useState(false),
        [editModalVisible, setEditModalVisible] = useState(false),
        [profit, setProfit] = useState({...initProfit}),
        [isRefresh, setIsRefresh] = useState(false),

        onButtonClick = () => {
            setChangeModalVisible(true);
            setNewStonk({...initStonk});
        },
        onHoldHandler = (stonk: StonkType) => {
            setSelectedStonk({...stonk});
            setEditModalVisible(true);
        },
        deleteStonk = () => {
            deleteSelectedStonk()
                .then(() => {
                    setEditModalVisible(false);
                })
                .catch(e => {
                    Alert.alert(`Ошибка`, e);
                });
        },
        setupEditStonk = () => {
            setNewStonk(selectedStonk);
            setEditModalVisible(false);
            setChangeModalVisible(true);
        };

    useEffect(() => {
        profit.plus = profit.minus = profit.total = 0;
        stonks && stonks.forEach((stonk: StonkType) => {
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
    //@ts-ignore
    const {navigation} = props;
    return (
        <View style={styles.container}>
            <Logout navigation={navigation}/>
            <View style={styles.buttonContainer} onTouchStart={onButtonClick}>
                <Text style={styles.button}>+</Text>
            </View>
            <View style={styles.top}>
                <Text style={styles.title}>Прибыль за этот месяц:<Text style={styles.plus}>{profit.plus}</Text></Text>
                <Text style={styles.title}>Убыток за этот месяц:<Text style={styles.minus}>{-profit.minus}</Text></Text>
                <Text style={styles.title}>Итого:<Text style={styles.total}>{profit.total}</Text></Text>
            </View>
            <ChangeStonkModal stonk={newStonk}
                              changeModalVisible={changeModalVisible}
                              setChangeModalVisible={setChangeModalVisible}
                              editStonk={() => {
                                  onEditStonk(newStonk);
                              }}/>
            <EditStonkModal stonk={selectedStonk}
                            modalVisible={editModalVisible}
                            setModalVisible={setEditModalVisible}
                            editStonk={setupEditStonk}
                            deleteStonk={deleteStonk}/>
            <Stonks stonks={stonks} onHoldHandler={onHoldHandler} isRefreshing={isRefresh} onRefresh={updateStonks}/>
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
