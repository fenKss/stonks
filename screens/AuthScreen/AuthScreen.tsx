import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
import {AuthScreenProps} from "../../ts/types";
import axios from "axios";
import qs from "qs";

export default function AuthScreen(props: AuthScreenProps) {
    const baseUrl: string = `http://192.168.0.101:8888`;
    // const baseUrl: string = `http://trimere.site`;
    const
        [isAuthed, setIsAuthed] = useState(false),
        [isLoading, setIsLoading] = useState(false),
        [login, setLogin] = useState(``),
        [password, setPassword] = useState(``);

    //@ts-ignore
    const {navigation} = props;

    const api = {
        tryAuth: (): Promise<any> => {
            const data = {
                user: {
                    email: login,
                    password
                }
            }
            return axios
                .post(`${baseUrl}/api/auth/login`, qs.stringify(data))
                .then((res) => {
                    const response = res.data
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true;
                })
                .catch((e) => {
                    throw e;
                })
        },
        checkAuth: (): Promise<any> => {
            return axios
                .get(`${baseUrl}/api/auth/base`)
                .then((res) => {
                    const response = res.data
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    const user = response.data.user;

                    return !!user;
                })
                .catch((e) => {
                    throw e;
                })
        },
        logout: (): Promise<any> => {
            return axios
                .get(`${baseUrl}/api/auth/logout`)
                .then((res) => {
                    const response = res.data
                    if (response.status.toUpperCase() != 'OK') {
                        throw response.error_msg;
                    }
                    return true
                })
                .catch((e) => {
                    throw e;
                })
        }
    }

    const firstAuth = () => {
        setIsLoading(true);
        api
            .checkAuth()
            .then(e => {
                setIsAuthed(e);
            })
            .catch(e => {
                console.log(e);
            }).finally(() => {
            setIsLoading(false);
        });
    }
    useEffect(() => {
        firstAuth();
        // api.logout();
    });
    const tryAuth = () => {
        setIsLoading(false);
        api
            .tryAuth()
            .then(e => {
                setIsAuthed(true);
            })
            .catch(e => {
                Alert.alert(`Ошибка`, e);
            }).finally(() => {
            setIsLoading(false);
        });
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000)
    // }, []);

    useEffect(() => {
        if (isAuthed)
            navigation.replace('Root');
    });

    if (isLoading) {
        return <View style={{flex: 1, justifyContent: `center`, alignItems: `center`}}><ActivityIndicator
            size={`large`}/></View>
    }
    return (
        // @ts-ignore
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.topText}>Welcome!</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Login</Text>
                    <TextInput style={styles.input}
                               placeholder={`Your username or email`}
                               value={login}
                               onChangeText={(text) => setLogin(text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input}
                               secureTextEntry={true}
                               placeholder={`Password`}
                               textContentType={`password`}
                               value={password}
                               onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity activeOpacity={0.8} onPress={tryAuth}
                                      style={styles.button}><Text>Enter</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: `transparent`,
    },
    top: {
        padding: 20,
        paddingTop: 140,
        paddingBottom: 50,
        backgroundColor: `#388922`,
    },
    topText: {
        fontWeight: `bold`,
        fontSize: 35,
    },
    content: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#fff",
        height: `100%`,
        marginTop: -20,
        paddingTop: 15,

    },
    formGroup: {
        backgroundColor: `transparent`,
        margin: 10
    },
    input: {
        borderBottomWidth: 1,
        padding: 5,
    },
    label: {
        fontSize: 18,
        color: 'grey',
        marginBottom: 10,
    },
    buttons: {
        backgroundColor: `transparent`,
        padding: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 20,
        fontSize: 16,
        alignItems: `center`,
    },

});
//@ts-ignore