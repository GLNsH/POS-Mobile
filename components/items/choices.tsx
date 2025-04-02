import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useState } from "react"

interface ChoicesItemType {
    selection: {name: string,id: string}[],
    id: string
}

type ChoicesItemProp = {
    item: ChoicesItemType
}

export default function ChoicesComponent ({item}:ChoicesItemProp) {
    const [newChoiceOption,setNewChoiceOption] = useState('')
    return (
        <View key={item.id} style={stylesContainer.addOnContainer}>
            <View style={{width: '100%', paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={addOnStyle.styledTitle}>CHOICE SELECTION</Text>
                <Pressable style={({pressed})=>([{backgroundColor: pressed ? '#ff0000' : '#00000000'},addOnStyle.btn])}>
                    <FontAwesome size={16} color={'#ff9088'} name="close" />
                </Pressable>
            </View>
            <View style={addOnStyle.itemContainer}>
            {item.selection.map( select =>
                <View key={select.id} style={addOnStyle.itemSolo}>
                    <Text style={addOnStyle.name}>{select.name.toUpperCase()}</Text>
                </View>
            )}
            </View>
            <View style={stylesContainer.addOption}>
                <View style={stylesContainer.addOnForm}>
                    <TextInput value={newChoiceOption} onChangeText={text => {setNewChoiceOption(text)}} style={stylesContainer.textInputSolo} placeholder="Name"/>
                    <Pressable style={stylesContainer.addBtn}>
                        <FontAwesome size={16} color={'white'} name="plus" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const stylesContainer = StyleSheet.create({
    addOption: {
        backgroundColor: 'white',
        padding: 3,
        paddingLeft: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    addOnContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        rowGap: 5,
        borderWidth: 1,
        borderColor: '#aaa'
    },
    addOnForm: {
        flexDirection: 'row',
        maxWidth: '100%',
        columnGap: 5,
    },
    textInputSolo: {
        width: '83%',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    textInputName: {
        width: '55%',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    textInputPrice: {
        width: '28%',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    addBtn: {
        minWidth: '12%',
        maxWidth: '12%',
        backgroundColor: '#2091eb',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#555'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container2: {
        width: 350,
        rowGap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 15,
        paddingTop: 15,
    },
    container3: {
        width: '100%',
        rowGap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 0,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#000'
    },
    container: {
        rowGap: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'PoppinsBold'
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        color: 'black',
        fontFamily: 'Poppins'
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
    inlineContainer: {
        width: 290,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    },
    btn: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        paddingRight: 10,
        paddingLeft: 10,
    },
    textInput: {
        width: '65%',
        fontSize: 15,
        padding: 0,
        paddingLeft: 15,
        paddingRight: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 10,
    },
}
)

const addOnStyle = StyleSheet.create({
    btn: {
        borderRadius: 100,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addOnsContainerMain: {
        rowGap: 10,
        display: 'flex'
    },
    item: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        paddingLeft: 12,
        paddingRight: 12,
    },
    itemName: {
        width: '70%'
    },
    itemPrice: {
        width: '30%',
        textAlign: 'right'
    },
    styledTitle: {
        color: 'black',
        fontFamily: 'PoppinsBold'
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 5,
        rowGap: 5,
        paddingLeft: 2,
        paddingRight: 2,
        marginLeft: 5,
        marginRight: 5,
    },
    itemSolo: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        paddingLeft: 12,
        paddingRight: 12,
        flexBasis: '48%',
        borderWidth: 1,
        borderColor: '#aaa'
    },
    name: {
        
    },
})