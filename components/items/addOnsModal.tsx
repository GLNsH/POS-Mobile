import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet, ScrollView, Pressable, TextInput, ToastAndroid } from "react-native";
import { MenuContext } from "@/context/menuContext";
import { useContext, useState } from "react";
import { MenuContextType } from "@/@types";
import { FontAwesome } from "@expo/vector-icons";
import ChoicesComponent from "./choices";
import AddOnGroupItem from "./addOnGroup";

export default function AddOnsModal () {
    const {addOnsVisible, setAddOnsVisibility, setSelectedAddOn, selectedAddOn, activeAddOn, addOns, createAddOnGroup, removeAddOnGroup} = useContext(MenuContext) as MenuContextType;
    const [newAddOnGroupName,setNewAddOnGroupName] = useState('');
    const [addOnData,setAddOnData] = useState({
        choices: [
            {
                selection: [
                    {name: 'Milktea',id: 'Milktea0'},
                    {name: 'Fruit-tea',id: 'Fruit-tea0'},
                ],
                id: '0'
            },
            {
                selection: [
                    {name: 'Takoyaki',id: 'Takoyaki0'},
                    {name: 'Fries', id: 'Fries1'},
                ],
                id: '1'
            }
        ], 
        options: [
            {name: 'Egg', price: 10, id: '0'},
            {name: 'Patty', price: 10, id: '1'},
            {name: 'Cucumber', price: 10, id: '2'}
        ],
        id: 'Combo 10_addOnGroup'
    })

    function handleSetVisibility(isVisible: boolean) {
        setAddOnsVisibility(isVisible);
        if (!isVisible) {
            setSelectedAddOn(null);
        }
    }

    function handleCreateAddOnGroup () {
        if (newAddOnGroupName.replaceAll(' ', '') !== '') {
            createAddOnGroup(newAddOnGroupName);
            setNewAddOnGroupName('')
        } else {
            ToastAndroid.show('Enter valid a name',ToastAndroid.SHORT);
        }
    }

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={addOnsVisible}
        onRequestClose={() => {
            handleSetVisibility(!addOnsVisible);
        }}
    >
        <TouchableWithoutFeedback onPress={() => {handleSetVisibility(false)}}>
            <View style={stylesContainer.centeredView}>
                <View style={stylesContainer.container}>
                    <TouchableWithoutFeedback>
                        <View style={stylesContainer.container2}>
                            <View style={stylesContainer.container3}>
                                <Text style={stylesContainer.title}>CREATE ADD-ON GROUP</Text>
                                <View style={stylesContainer.innerContainer}>
                                    <View style={stylesContainer.inlineContainer}>
                                        <TextInput value={newAddOnGroupName} onChangeText={text => setNewAddOnGroupName(text)} style={stylesContainer.textInput} placeholder='Add-on Group'/>
                                        <Pressable onPress={() => {handleCreateAddOnGroup()}} disabled={false} style={({pressed}) => [{backgroundColor: pressed ? '#8F481A' : '#f37b2d', opacity: false ? 0.5 : 1 },stylesContainer.btn]}>
                                            <Text style={stylesContainer.btnText}>CREATE</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <ScrollView style={styler.hScroll} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styler.hScrollContainer}>
                                    <View style={styler.horizontalContainer}>
                                        <View style={styler.LWhiteSpace}/>
                                        {addOns && addOns.map(item => (
                                            <AddOnGroupItem key={item.id} item={item}/>
                                        ))}
                                        <View style={styler.whiteSpace}/>
                                    </View>
                                </ScrollView>
                            </View>
                            <Text style={addOnStyle.styledTitle}>CREATE ADD-ONS</Text>
                            <View style={{flexDirection: 'row', columnGap: 10}}>
                                <Pressable style={({pressed}) => [stylesContainer.btn,{width: 180, height: 30,backgroundColor: pressed ? '#8F481A' : '#f37b2d'}]}>
                                    <Text style={stylesContainer.btnText}>ADD CHOICE OPTION</Text>
                                </Pressable>
                            </View>
                            <View style={{maxHeight: 300, width: '100%', borderColor: '#aaa'}}>
                            <ScrollView style={{maxHeight: 300, width: '100%', borderRadius: 10}}>
                                <TouchableWithoutFeedback>
                                    <View style={addOnStyle.addOnsContainerMain}>
                                    {activeAddOn && activeAddOn.choices.map( item =>
                                        <ChoicesComponent key={item.id} item={item}/>
                                    )}
                                        <View style={stylesContainer.addOnContainer}>
                                            <View style={{width: '100%', paddingLeft: 10}}>
                                                <Text style={addOnStyle.styledTitle}>OPTIONAL</Text>
                                            </View>
                                            {activeAddOn && activeAddOn.options.map( item =>
                                                <View key={item.id} style={addOnStyle.item}>
                                                    <Text style={addOnStyle.itemName}>{item.name.toUpperCase()}</Text>
                                                    <Text style={addOnStyle.itemPrice}>₱{item.price}</Text>
                                                </View>
                                            )}
                                            <View style={stylesContainer.addOption}>
                                                <View style={stylesContainer.addOnForm}>
                                                    <TextInput style={stylesContainer.textInputName} placeholder="Name"/>
                                                    <TextInput style={stylesContainer.textInputPrice} placeholder="Price"/>
                                                    <Pressable style={stylesContainer.addBtn}>
                                                        <FontAwesome size={16} color={'white'} name="plus" />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                            </View>
                            <View style={{flexDirection: 'row', columnGap: 10}}>
                                <Pressable style={({pressed}) => [stylesContainer.btn,{width: 120, height: 30,backgroundColor: pressed ? '#1e6e3d' : '#36c26d'}]}>
                                    <Text style={stylesContainer.btnText}>CONFIRM</Text>
                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
    )
}

const addOnStyle = StyleSheet.create({
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


const styler = StyleSheet.create({
    hScroll: {
        maxHeight: 50,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#eee',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    hScrollContainer: {
    },
    LWhiteSpace: {
        width: 2,
    },
    whiteSpace: {
        width: 10,
    },
    horizontalContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
    },
    category: {
        height: 35,
        minWidth: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 0,
        paddingRight: 12,
        paddingLeft: 12,
        borderRadius: 50,
    },
    categoryText: {
        color: 'white',
        fontFamily: "Poppins"
    },
})
