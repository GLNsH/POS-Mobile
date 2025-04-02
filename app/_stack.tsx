import { Stack } from 'expo-router';
import { useContext, FC } from 'react';

import { Pressable, Text, StyleSheet, Clipboard, ToastAndroid } from 'react-native';
import { MenuContext } from "../context/menuContext";
import { MenuContextType } from '../@types';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const Stacking: FC = () => {
  const { clearCartItems, cart, accessReceipt, details, deleteTransaction } = useContext(MenuContext) as MenuContextType;

  let total = 0;
  let disabled = true;
  if (cart) {
      for (let i = 0; cart.length > i; i++) {
        let item = cart[i];
        total += item.amount*item.price;
    }

    disabled = cart.length ? false : true;
  }

  function copyReceipt () {
    Clipboard.setString(accessReceipt());
    ToastAndroid.show('Reciept copied to clipboard!', ToastAndroid.SHORT);
  }

  function removeTransaction () {
    router.back();
    if (details[0]) {
      deleteTransaction(details[0].tn);
    }
  }


  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{
            title: 'Cart',
            presentation: 'modal',
            headerRight: () => (
            <Pressable disabled={disabled} onPress={()=> {clearCartItems()}} style={({ pressed }) => [{ backgroundColor: pressed ? '#8F481A' : '#f37b2d', opacity: disabled ? 0.5 : 1, }, styles.btnClear ]}>
            <Text style={styles.title}>CLEAR</Text>
            </Pressable>
        ),
        }} />
        <Stack.Screen name="transactionDetails" options={{
            title: 'Transaction Details',
            presentation: 'modal',
            headerLeft: () => (
              <Pressable onPress={()=> {removeTransaction()}} style={({ pressed }) => [{ backgroundColor: pressed ? 'grey' : 'white', opacity: disabled ? 0.5 : 1, }, styles.btnClear ]}>
                <FontAwesome size={20} name="trash" color={'black'}/>
              </Pressable>
            ),
            headerRight: () => (
              <Pressable onPress={()=> {copyReceipt()}} style={({ pressed }) => [{ backgroundColor: pressed ? 'grey' : 'white', opacity: disabled ? 0.5 : 1, }, styles.btnClear ]}>
                <FontAwesome size={20} name="clone" color={'black'}/>
              </Pressable>
              )
        }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  btnClear: {
    height: 40,
    width: 70,
    padding: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default Stacking;
