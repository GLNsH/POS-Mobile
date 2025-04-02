import { View, StyleSheet } from 'react-native';
import { useContext } from "react";
import CartItem from "./cartItem";
import { MenuContext } from "../../context/menuContext";
import { MenuContextType } from '../../@types';

export default function CartUI () {
    const { cart } = useContext(MenuContext) as MenuContextType;
    return (
    <View  style={styler.container}>
        {cart && cart.map(item => (<CartItem key={item.id} item={item}/>))}
    </View>
)}


const styler = StyleSheet.create({
    container: {
        display: "flex",
        paddingTop: 0,
        padding: 15,
    },
})