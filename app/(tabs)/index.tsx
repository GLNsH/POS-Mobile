import React from "react";
import { ScrollView, View } from "react-native";
import Menu from "../../components/menu/Menu";
//npx expo install react-native-web react-dom // web  

export default function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
          <Menu/>
      </View>
    </ScrollView>
  );
}