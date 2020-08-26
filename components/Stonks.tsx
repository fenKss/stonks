import Stonk from "./Stonk";
import {View, StyleSheet, ScrollView, FlatList} from "react-native";
import * as React from "react";

const Stonks = (props: []) => {
    const renderItem = (item => {
        return <Stonk {...item.item}/>
    });
    return (
        <FlatList style={styles.stonks}
                  data={props.stonks}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
        />

    )
}


export default Stonks;

const styles = StyleSheet.create({
    stonks: {
        width: "100%"
    }
});