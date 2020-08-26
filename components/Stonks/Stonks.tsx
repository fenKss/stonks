import Stonk from "./Stonk";
import {View, StyleSheet, ScrollView, FlatList} from "react-native";
import * as React from "react";
import {StonkType} from "../../types";

type Item = {
    item: StonkType
}
type Props = {
    stonks:StonkType[]
}
const Stonks = (props: Props) => {
    const renderItem = ((item: Item) => {
        return <Stonk {...item.item}/>
    }
)
    ;

    return (
        <FlatList style={styles.stonks}
                  data={props.stonks}
                  renderItem={renderItem}
                 // @ts-ignore
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