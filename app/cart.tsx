import { ScrollView, StyleSheet, View } from "react-native";
import CartUI from "../components/cart/cartUI";
import CartTotal from "../components/cart/cartTotal";

export default function Cart() {
  return (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
      <CartUI/>
    </ScrollView>
    <CartTotal/>
  </View>
  
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
  }
});
  