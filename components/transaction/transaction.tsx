import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";
import { MenuContext } from "../../context/menuContext";
import { useContext } from "react";
import { MenuContextType, TransactionPropType } from "@/@types";

export default function Transaction ({transaction} : TransactionPropType) {
    const { showDetails } = useContext(MenuContext) as MenuContextType;

    return (
    <View style={styles.container}>
        <View style={styles.dateTime}>
            <Text style={styles.date}>{transaction.date}</Text>
            <Text style={styles.time}>{transaction.time}</Text>
        </View>
        <Text style={styles.money}>₱ {transaction.total.toLocaleString(undefined,{maximumFractionDigits: 2})}</Text>
        <Link style={styles.btnContainer} href={"/transactionDetails"} asChild>
            <Pressable onPress={() => {showDetails(transaction)}}>
                <FontAwesome size={20} name="ellipsis-h" color={'white'} />
            </Pressable>
        </Link>
        
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
    btnContainerPressed: {
        borderRadius: 50,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8F481A',
    },
    btn: {
        width: 32,
        height: 32,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    date: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 15,
        color: '#555'
    },
    dateTime: {
        width: '60%',
        flexDirection: 'column',
    },
    money: {
        width: '30%',
        fontWeight: 'bold',
    },
    btnContainer: {
        borderRadius: 50,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f37b2d',
    },
})