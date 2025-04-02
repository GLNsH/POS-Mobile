import { StyleSheet , View, Clipboard, ToastAndroid } from "react-native";
import OrderDetail from "./orderDetail";
import { MenuContext } from "../../context/menuContext";
import { useContext, useEffect } from "react";
import { MenuContextType, TransactionsType } from "@/@types";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginTop: 0,
        margin: 15,
    }
})

export default function OrderDetailsUI () {
    const { details, accessReceipt } = useContext(MenuContext) as MenuContextType;

    useEffect(()=>{
            sendReceipt()
        }
    )
    
    let detailsNow;
    if (details[0]) {
        detailsNow = details[0]
        useEffect(
            () => {detailsNow = details[0]},
            [details]
        )
    }

    function sendReceipt () {
        if (!details[0]) {return}
        let tempTransact = details[0];
        let receiptText = (
            '                          ZIRA\n'+
            `${tempTransact.date}                ${tempTransact.time}\n`+
            '--------------------------------------\n'
        )
        tempTransact.orders.map(
            item => receiptText += `(${item.amount}) ${item.name.toUpperCase()} - ${String(item.price).toUpperCase()} => ${String(item.amount*item.price).toUpperCase()}\n`
        )
        receiptText += `TOTAL      ${tempTransact.total}\n`
        receiptText += `CASH       ${tempTransact.cash}\n`
        receiptText += `CHANGE  ${tempTransact.change}\n`
        receiptText += '--------------------------------------\n'
        receiptText += 'THANK YOU FOR DINING WITH US\n'
        receiptText += 'WE APPECIATE YOUR BUSINESS.'
        accessReceipt(receiptText);
    }

    return (
    <View style={styles.container}>
        <View>
            {detailsNow && detailsNow.orders.map(item => (<OrderDetail key={item.id} item={item}/>))}
        </View>
    </View>
    
)}