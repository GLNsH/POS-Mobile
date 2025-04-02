import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MenuContext } from "../../context/menuContext";
import { useContext } from "react";
import placeholder from '../../assets/imgs/icon.png';
import { MenuContextType, itemType } from '../../@types';

export default function CartItem({item}: itemType) {
    const { modifyCartAmount, removeCartItem } = useContext(MenuContext) as MenuContextType;
    
    return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={item.image ? {uri: item.image} : placeholder}></Image>
        </View>
        <View style={styles.main}>
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.numbers}>
                <Text style={styles.price}>₱ {item.price.toLocaleString(undefined,{maximumFractionDigits:2})}</Text>
                <View style={styles.quantityContainer}>
                    <View style={styles.quantity}>
                        <Text style={styles.amount}>{item.amount}</Text>
                        <View style={styles.btnContainer}>
                            <Pressable onPress={()=> {modifyCartAmount(item.id,false)}} style={({ pressed }) => [{ backgroundColor: pressed ? '#8F481A' : '#f37b2d' }, styles.btnMinus ]}>
                                <FontAwesome size={16} name="minus" color={'white'} />
                            </Pressable>
                            <Pressable onPress={()=> {modifyCartAmount(item.id,true)}} style={({ pressed }) => [{ backgroundColor: pressed ? '#8F481A' : '#f37b2d' }, styles.btnPlus ]}>
                                <FontAwesome size={16} name="plus" color={'white'} />
                            </Pressable>
                        </View>
                    </View>
                    <Pressable onPress={()=> {removeCartItem(item.id)}} style={({ pressed }) => [{ backgroundColor: pressed ? '#710000' : '#ff0000' }, styles.btnClose ]}>
                        <FontAwesome size={16} name="close" color={'white'} />
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
)}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        right: 0,
        top: -50,
        position: 'absolute',
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
    }, 
    logoContainer: {
        alignSelf: 'center',
        width: 0,
        height: 0,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
        borderRadius: 20,
        marginLeft: 50,
        paddingLeft: 50,
        marginTop: 20,
    },
    main: {
        width: '100%',
        flexDirection: 'column',
        padding: 15,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    description: {
        fontSize: 10,
        color: '#999'
    },
    numbers: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantity: {
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 15,
        width: '50%'
    },
    quantityContainer: {
        flexDirection: 'row',
        width: 110,
    },
    amount: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    btnContainer: {
        flexDirection: 'row',
    },
    btnMinus: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    btnPlus: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
    btnClose: {
        marginTop: 'auto',
        marginLeft: 10,
        padding: 5,
        paddingLeft: 9,
        paddingRight: 9,
        borderRadius: 100,
    },
})