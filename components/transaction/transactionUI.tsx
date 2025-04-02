import { StyleSheet , View } from "react-native";
import Transaction from "./transaction";
import { MenuContext } from "../../context/menuContext";
import { useContext } from "react";
import { MenuContextType } from "@/@types";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginTop: 0,
        margin: 15,
    }
})

export default function TransactionUI () {
    const { transactionsRecord } = useContext(MenuContext) as MenuContextType;

    return (
    <View style={styles.container}>
        {transactionsRecord && transactionsRecord.map(item => (<Transaction key={item.tn} transaction={item}/>))}
    </View>
    
)}