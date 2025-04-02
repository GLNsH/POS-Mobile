import { ScrollView, View } from "react-native";
import ItemsUI from "../../components/items/itemsUI";

export default function Items() {
  return (
    <View>
      <ScrollView>
        <ItemsUI/>
      </ScrollView>
    </View>
  );
}
