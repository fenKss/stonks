import Stonk from "./Stonk";
import {FlatList, StyleSheet} from "react-native";
import * as React from "react";
import {StonkType} from "../../ts/types";

type Item = {
    item: StonkType
}
type Props = {
    stonks:StonkType[],
    onHoldHandler:(stonk:StonkType)=>void,
    isRefreshing:boolean,
    onRefresh:()=>void,
}
const Stonks = (props: Props) => {
    const renderItem = ((item: Item) => <Stonk stonk={item.item} onHoldHandler={props.onHoldHandler}/>);
    return (
        <FlatList style={styles.stonks}
                  data={props.stonks}
                  renderItem={renderItem}
                  refreshing={props.isRefreshing}
                  onRefresh={props.onRefresh}
                  keyExtractor={item => item.id.toString()}
        />
    )
}

export default Stonks;

const styles = StyleSheet.create({
    stonks: {
        width: "100%"
    }
});