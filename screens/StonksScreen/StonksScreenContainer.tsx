/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {connect} from 'react-redux';
import StonksScreen from "./StonksScreen";

import {State, StonksScreenProps, StonkType} from '../../ts/types';
import axios from "axios";
import qs from "qs";
import {setNewStonk, setSelectedStonk, setStonks} from "../../redux/StonksReducer";

axios.defaults.withCredentials = true
class AuthContainer extends React.Component<StonksScreenProps> {
    //baseUrl:string = `https://trimere.site`,
    baseUrl: string = `http://10.76.131.67:8888`;

    async componentDidMount() {
        this.updateStonks()
            .catch(e => {
                if (e == `user error`) {
                    this.props.navigation.replace('Auth');
                }
            });
    }

    getStonksFromServer = async (): Promise<StonkType[] | void> => {
        const {baseUrl} = this;
        return axios
            .get(`${baseUrl}/api/stonk`)
            .then(res => {
                const response = res.data;
                if (response.status.toUpperCase() != 'OK') {
                    throw response.error_msg;
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
                if (e == `user error`) {
                    return this.props.navigation.replace('Auth');
                }
                throw e;
            })

    };
    addStonkToServer = async (stonk: StonkType) => {
        const data = {
            stonk
        };
        const {baseUrl} = this;
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
                if (e == `user error`) {
                    return this.props.navigation.replace('Auth');
                }
                throw e;
            })
    };
    editStonkOnServer = async (stonk: StonkType) => {
        const data = {
            stonk
        };
        const {baseUrl} = this;
        if (!stonk.id) {
            throw `Произошла внутренняя ошибка`;
        }
        // setIsFetching(true);
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
                if (e == `user error`) {
                    return this.props.navigation.replace('Auth');
                }
                throw e;
            })
    };
    deleteStonkOnServer = async (stonk: StonkType) => {
        // setIsFetching(true);
        const {baseUrl} = this;
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
                if (e == `user error`) {
                    return this.props.navigation.replace('Auth');
                }
                throw e;
            }).finally(() => {
                // setIsFetching(false);
            })
    };
    editStonk = async (stonk: StonkType): Promise<any> => {
        if (!stonk.title || !stonk.summ) {
            throw `Укажите все данные`
        }
        const {setStonks} = this.props;
        const {addStonkToServer} = this;
        if (!stonk.id) {
            // changeNewStonk(newStonk);
            // @ts-ignore
            return addStonkToServer(stonk)
                .then(() => {
                    return this.getStonksFromServer().then(stonks => {
                        // @ts-ignore
                        setStonks(stonks);
                        // changeNewStonk({...initStonk});
                    }).catch((e: any) => {
                        throw e;
                    })

                })
                .catch((e: any) => {
                    throw e;
                })

        } else {
            return this
                .editStonkOnServer(stonk)
                .then(e => {
                    return this.getStonksFromServer().then(stonks => {
                        // @ts-ignore
                        setStonks(stonks);
                        // changeNewStonk({...initStonk});
                    })

                })
                .catch(e => {
                    throw e;
                });
        }

    };
    deleteSelectedStonk = async (): Promise<any> => {
        const {selectedStonk, setStonks} = this.props;

        return this.deleteStonkOnServer(selectedStonk)
            .then(e => {
                return this.getStonksFromServer().then(stonks => {
                    // @ts-ignore
                    setStonks(stonks);
                })

            })
            .catch(e => {
                throw e;
            })

    };
    updateStonks = (): Promise<any> => {
        const {setStonks} = this.props;
        // @ts-ignore
        return this.getStonksFromServer().then((stonks: StonkType[]) => {
            setStonks(stonks);
        }).catch((e) => {
            throw e
        });
    };

    render() {
        const {
            stonks,
            newStonk,
            selectedStonk,
            setStonks,
            setNewStonk,
            setSelectedStonk,
            navigation
        } = this.props;
        const {deleteSelectedStonk, updateStonks, editStonk} = this;
        return (
            <StonksScreen
                setStonks={setStonks}
                stonks={stonks}
                updateStonks={updateStonks}
                editStonk={editStonk}
                deleteSelectedStonk={deleteSelectedStonk}
                newStonk={newStonk}
                selectedStonk={selectedStonk}
                setNewStonk={setNewStonk}
                setSelectedStonk={setSelectedStonk}
                navigation={navigation}/>
        );
    }
}

const mapStateToProps = (state: State) => ({
    stonks: state.stonksScreen.stonks,
    newStonk: state.stonksScreen.newStonk,
    selectedStonk: state.stonksScreen.selectedStonk,
});
const mapDispatchToProps = {setStonks, setNewStonk, setSelectedStonk};
export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);