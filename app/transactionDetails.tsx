import { ScrollView } from "react-native";
import OrderDetailsUI from "../components/orders/orderDetailsUI";

export default function TransactionDetails() {
  return (
  <ScrollView showsVerticalScrollIndicator={false}>
    <OrderDetailsUI/>
  </ScrollView>
);
}