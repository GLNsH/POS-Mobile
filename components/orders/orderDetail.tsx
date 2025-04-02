import { StyleSheet, Text, View } from "react-native";
import { itemType } from "@/@types";

export default function OrderDetail ({item}:itemType) {
    return (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.unitPrice}>₱ {item.price.toLocaleString(undefined,{maximumFractionDigits: 2})}</Text>
        </View>
        <Text style={styles.amount}>{item.amount}</Text>
        <View style={styles.priceContainer}>
            <Text style={styles.price}>₱ {(item.price*item.amount).toLocaleString(undefined,{maximumFractionDigits: 2})}</Text>
        </View>
    </View>
    
)}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.29,
        elevation: 5,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    unitPrice: {
        color: '#333',
    },
    price: {
        fontWeight: 'bold',
    },
    item: {
        width: '55%',
        paddingLeft: 10,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        color: '#000',
    },
    priceContainer: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
})