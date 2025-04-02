import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MenuContext } from "../../context/menuContext";
import { useContext } from "react";
import placeholder from '../../assets/imgs/zira_logo.jpg';
import { MenuContextType, itemType } from "@/@types";

export default function MenuItem ({ item } : itemType) {
    const { addToCart } = useContext(MenuContext) as MenuContextType;

    function handleAddToCart() {
        addToCart(item);
    }

    return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={item.image ? {uri: item.image} : placeholder}></Image>
        </View>
        <View style={styles.title}> 
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.quantity}>
            <Text style={styles.price}>₱ {item.price.toLocaleString(undefined,{maximumFractionDigits:2})}</Text>
            <Pressable style={styles.addToCart} onPress={() => {handleAddToCart()}}>
                {({ pressed }) => (
                    <FontAwesome size={32} name="plus-circle" color={pressed ? '#8F481A' : '#f37b2d'} />
                )}
            </Pressable>
        </View>
    </View>
)}

const styles = StyleSheet.create({
    container: {
        flexBasis: '46%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.29,
        elevation: 5,
        borderRadius: 20,
        marginTop: 75,
        paddingTop: 70,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 100,
        bottom: 10,
        left: 0,
        position: 'absolute',
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        width: '100%',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    description: {
        fontSize: 10,
        color: '#999'
    },
    quantity: {
        width: '100%',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addToCart: {
      width: '20%'  
    },
    price: {
        fontWeight: 'bold',
        width: '70%',
        fontSize: 15,
    }, 
    logoContainer: {
        width: 120,
        height: 0,
    },
})