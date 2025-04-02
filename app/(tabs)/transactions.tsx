import { ScrollView } from "react-native";
import TransactionUI from "../../components/transaction/transactionUI";

export default function Transactions() {
  return (
    <ScrollView>
      <TransactionUI/>
    </ScrollView>
  );
}