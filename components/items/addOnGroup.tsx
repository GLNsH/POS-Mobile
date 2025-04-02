import { View, Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MenuContext } from "@/context/menuContext";
import { useContext } from "react";
import { MenuContextType, AddOnType } from "@/@types";


export default function AddOnGroupItem ({item}:{item: AddOnType}) {
    const { setSelectedAddOn, selectedAddOn, removeAddOnGroup } = useContext(MenuContext) as MenuContextType;
    function handleSelection(selected: string) {
        if (selectedAddOn !== selected) {
            setSelectedAddOn(selected);
        } else {
            setSelectedAddOn(null);
        }
    }

    return (
    <View key={item.id} style={stylesContainer.category}>
        <Pressable onPress={() => {handleSelection(item.id)}} style={[{backgroundColor: (selectedAddOn === item.id) ? '#4744fc' : '#448efc'},stylesContainer.categoryBtn]}>
            <Text style={stylesContainer.categoryText}>{item.name}</Text>
        </Pressable>
        <Pressable onPress={() => {removeAddOnGroup(item.id)}} style={({pressed}) => [{backgroundColor: pressed ? '#193661' : '#00000000'},stylesContainer.categoryDelete]}>
            <FontAwesome name="close" color={'white'} size={16}/>
        </Pressable>
    </View>)
}

const stylesContainer = StyleSheet.create({
    category: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryBtn: {
        height: 35,
        minWidth: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 0,
        paddingRight: 32,
        paddingLeft: 12,
        borderRadius: 50,
    },
    categoryDelete: {
        height: 28,
        width: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        paddingBottom: 1,
        position: 'absolute',
        right: 2,
    },
    categoryText: {
        color: 'white',
        fontFamily: "Poppins"
    },
}
)