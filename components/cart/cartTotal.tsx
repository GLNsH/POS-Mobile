import { MenuContext } from "../../context/menuContext";
import { useContext, useEffect, useState } from "react";
import { MenuContextType, TransactionsType } from '../../@types';
import { Text, Clipboard, ToastAndroid, View, StyleSheet, Pressable, Modal, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';
import isNumeric from "@/hooks/isNumeric";
// import Clipboard from '@react-native-clipboard/clipboard';

export default function CartTotal () {
    const { cart, checkout } = useContext(MenuContext) as MenuContextType;
    const [isVisible, setVisibility] = useState(false);
    const [receipt, setReceipt] = useState('');
    const [checkoutDisabled,setCheckoutDisabled] = useState(true);
    const [change, setChange] = useState(0);
    const [cash, setCash] = useState('');
    const [disabled,setDisabled] = useState(true);

    let total = 0;
    if (cart) {
        for (let i = 0; cart.length > i; i++) {
            let item = cart[i];
            total += item.amount*item.price;
        }
    }

    useEffect(()=>{
        if (cart) {
            setDisabled(cart.length ? false : true)
        }
    },[cart])

    function setCashChange (text: string) {
        if (isNumeric(text)) {
            if (Number(text)-total >= 0) {
                setCheckoutDisabled(false);
                setChange(Number(text)-total);
            } else {
                setCheckoutDisabled(true);
                setChange(0);
            }
            setCash(text);
        } else if (text === '') {
            setCheckoutDisabled(true);
            setCash('');
        } else {
            setCash(cash)
        }
    }

    
    function CheckoutNow () {
        setCash('');
        setChange(0);
        setCheckoutDisabled(true);
        setVisibility(true);
    }

    function CheckThisOut () {
        let CASH = Number(cash);
        let CHANGE = Number(change);
        let tempTransact = checkout(total, CASH, CHANGE);
        if (!tempTransact) {
            Alert.alert('','Please enter correct cash amount')
            return
        }
        let receiptText = (
            '                          ZIRA\n'+
            `${tempTransact.date}                ${tempTransact.time}\n`+
            '--------------------------------------\n'
        )
        tempTransact.orders.map(
            item => {let tempTotal = item.amount*item.price; receiptText += `(${item.amount}) ${item.name.toUpperCase()} - ${String(item.price.toLocaleString(undefined,{maximumFractionDigits:2})).toUpperCase()} > ${tempTotal.toLocaleString(undefined,{maximumFractionDigits:2})}\n`}
        )
        receiptText += `TOTAL      ${tempTransact.total.toLocaleString(undefined,{maximumFractionDigits:2})}\n`
        receiptText += `CASH       ${CASH.toLocaleString(undefined,{maximumFractionDigits:2})}\n`
        receiptText += `CHANGE  ${CHANGE.toLocaleString(undefined,{maximumFractionDigits:2})}\n`
        receiptText += '--------------------------------------\n'
        receiptText += 'THANK YOU FOR DINING WITH US\n'
        receiptText += 'WE APPECIATE YOUR BUSINESS.'
        setReceipt(receiptText);
        Clipboard.setString(receiptText);
        ToastAndroid.show('Reciept copied to clipboard!', ToastAndroid.SHORT);
        setCash('');
        setChange(0);
        setCheckoutDisabled(true);
        setVisibility(false);
    }

    let numberFormat = Intl.NumberFormat()

    return (
    <View>
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setVisibility(!isVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() => {setVisibility(false)}}>
                <View style={styles2.centeredView}>
                    <View style={styles2.container}>
                        <TouchableWithoutFeedback>
                            <View style={modalStyler.container}>
                                <View style={styles2.containerRow}>
                                <Text style={styles2.changeLabel}>TOTAL</Text>
                                <Text style={styles2.changeNum}>{total.toLocaleString(undefined,{maximumFractionDigits:2})}</Text>
                                </View>
                                <View style={styles2.containerRow}>
                                    <Text style={styles2.nameLabel}>CASH</Text>
                                    <TextInput keyboardType='numeric' maxLength={7} style={styles2.name} placeholder="Input Cash" value={cash} onChangeText={text => setCashChange(text)}/>
                                </View>
                                <View style={styles2.containerRow}>
                                    <Text style={styles2.changeLabel}>CHANGE</Text>
                                    <Text style={styles2.changeNum} >{change.toLocaleString(undefined,{maximumFractionDigits:2})}</Text>
                                </View>
                                <View style={styles2.containerRow}>
                                    <Pressable disabled={checkoutDisabled} onPress={CheckThisOut} style={({ pressed }) => [{ backgroundColor: pressed ? '#8F481A' : '#f37b2d', opacity: checkoutDisabled ? 0.4 : 1 }, styles.btnCheckout2 ]}>
                                        <Text style={styles.btnText2}>CHECKOUT</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.container}>
            {/* <Pressable onPress={CheckoutNow} style={styles2.btn}>
                <Text>DEV</Text>
            </Pressable> */}
            <Text style={styles.total}>₱{total.toLocaleString(undefined,{maximumFractionDigits:2})}</Text>
            <Text style={styles.border}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
            <View style={styles.checkout}>
                <Pressable disabled={disabled} onPress={() => {CheckoutNow()}} style={({ pressed }) => [{ backgroundColor: pressed ? '#8F481A' : '#f37b2d', opacity: disabled ? 0.4 : 1 }, styles.btnCheckout ]}>
                    <Text style={styles.btnText}>CHECKOUT</Text>
                </Pressable>
            </View>
        </View>
    </View>
)}

const modalStyler = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 10,
        padding: 20,
        paddingTop: 15,
    },
})

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 0,
        paddingTop: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    total: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingLeft: 20,
        paddingRight: 25,
    },
    border: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center'
    },
    checkout: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    btnCheckout: {
        width: '100%',
        borderRadius: 50,
        paddingTop: 15,
        paddingBottom: 15,
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    btnCheckout2: {
        width: '80%',
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 5,
    },
    btnText2: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})


const styles2 = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
      },
    container: {
        rowGap: 15,
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        borderRadius: 10,
    },
    btn: {
        width: 60,
        height: 60,
        backgroundColor: '#888',
        padding: 5,
        paddingBottom: 0, 
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5,
        paddingLeft: 5,
    },
    changeLabel: {
        width: '35%',
        fontWeight: 'bold'
    },
    changeNum: {
        textAlign: 'center',
        width: '65%',
    },
    nameLabel: {
        width: '35%',
        fontWeight: 'bold'
    },
    name: {
        width: '65%',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        textAlign: 'center',
    },
    
});