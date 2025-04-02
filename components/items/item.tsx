import { Image, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/menuContext";
import placeholder from '../../assets/imgs/zira_logo.jpg';
import { MenuContextType, MenuItemType, itemType } from '../../@types';
import isNumeric from '@/hooks/isNumeric';

export default function Item ({item}:itemType) {
    const { resetRelays, modifyMenuItem, deleteMenuItem, setModalVisible, getRelayImage, setCategoryVisible, getRelayCategory, itemCategory, uriImage } = useContext(MenuContext) as MenuContextType;
    const [isEditable,setEditState] = useState(false);
    const [itemName,setItemName] = useState(item.name);
    const [itemPrice,setItemPrice] = useState(String(item.price));
    const [itemImage,setItemImage] = useState(item.image);
    const [itemDescription,setItemDescription] = useState(item.description);
    const [itemCategoryId,setItemCategoryId] = useState(item.categoryId);

    useEffect(()=>{
        if (isEditable) {
        let categoryFetch = getRelayCategory();
        let imageFetch = getRelayImage();
        if (categoryFetch?.item && categoryFetch.caller === item.id) {
            setItemDescription(categoryFetch.item.name);
            setItemCategoryId(categoryFetch.item.id);
        }
        if (imageFetch?.item && imageFetch.caller === item.id) {
            if (imageFetch.item === 'REMOVE_IMAGE') {
                setItemImage(null);
            } else {
                setItemImage(imageFetch.item);
            }
        }}
    },[itemCategory,uriImage])

    function handleEditBtn () {
        resetRelays();
        if (isEditable) {
            let tempItem: MenuItemType = {
                id: item.id,
                name: itemName,
                description: itemDescription ? itemDescription : 'All',
                price: Number(itemPrice),
                image: itemImage,
                amount: item.amount,
                categoryId: itemCategoryId ? itemCategoryId : 'All'
            }
            modifyMenuItem(tempItem);
        }
        setEditState(!isEditable);
    }

    function setPriceNumber (str: string) {
        if (isNumeric(str)){
            setItemPrice(str);
        } else if (str === '') {
            setItemPrice(str);
        } else {
            setItemPrice(itemPrice);
        }
    }
   
    return (
    <View style={stylesItem.container}>
        <View style={stylesItem.logoContainer}>
            <Image style={stylesItem.logo} source={itemImage ? {uri: itemImage} : placeholder}></Image>    
            <Pressable disabled={!isEditable} onPress={()=> {resetRelays();setModalVisible(true,item.id)}} style={({ pressed }) => [{ backgroundColor: pressed ? '#aaa' : '#eee', opacity: isEditable ? 1 : 0.5 }, stylesItem.btnMinus2 ]}>
                <FontAwesome size={16} name="camera" color={'#444'} />
            </Pressable>
        </View>
        <View style={stylesItem.main}>
            <View>
                {isEditable &&<TextInput style={stylesItem.name} editable={isEditable} value={itemName} onChangeText={(itext) => {setItemName(itext)}}/>}
                {!isEditable &&<View style={uneditable.nameContainer}>
                    <Text style={uneditable.name}>{itemName}</Text>
                </View>}
                <View style={styles.itemRow}>
                    <Pressable disabled={!isEditable} onPress={() => {setCategoryVisible(true,item.id)}} style={({ pressed }) => [{ backgroundColor: pressed ? '#555' : '#777', opacity: !isEditable ? 0.5 : 1 }, styles.btnCategory ]}>
                        <FontAwesome name="link" size={20} color={'white'} />
                    </Pressable>
                    <View style={uneditable.descriptionContainer}>
                        <Text style={uneditable.descriptionText}>{itemDescription}</Text>
                    </View>
                </View>
            </View>
            <View style={stylesItem.numbers}>
                <View style={stylesItem.priceContainer}>
                    <Text style={stylesItem.price}>₱</Text>
                    {isEditable &&<TextInput keyboardType='numeric' maxLength={7} style={stylesItem.priceInput} editable={isEditable} value={itemPrice} onChangeText={(itext) => {setPriceNumber(itext)}}/>}
                    {!isEditable &&<View style={uneditable.priceInputContainer}>
                        <Text style={uneditable.priceInput}>{itemPrice}</Text>
                    </View>}
                </View>
                <View style={stylesItem.quantityContainer}>
                    <View style={stylesItem.quantity}>
                        <View style={stylesItem.btnContainer}>
                            <Pressable onPress={()=> {handleEditBtn()}} style={({ pressed }) => [{ backgroundColor: pressed ? `${isEditable ? '#386641' :'#8F481A'}` : `${isEditable ? '#6a994e' : '#f37b2d'}` }, stylesItem.btnMinus ]}>
                                <FontAwesome size={16} name={isEditable ? 'save' : 'pencil'} color={'white'} />
                            </Pressable>
                            <Pressable onPress={()=> {deleteMenuItem(item.id)}} style={({ pressed }) => [{ backgroundColor: pressed ? '#770000' : 'crimson' }, stylesItem.btnPlus ]}>
                                <FontAwesome size={16} name="close" color={'white'} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>
)}

const uneditable = StyleSheet.create({
    priceInputContainer: {
        backgroundColor: '#eee',
        height: 30,
        padding: 6,
        paddingTop: 2,
        paddingBottom: 2,
        width: '70%',
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
    },
    priceInput: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#999'
    },
    nameContainer: {
        height: 28,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#eee',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#999',
    },
    descriptionContainer: {
        width: '70%',
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#eee'
    },
    descriptionText: {
        fontSize: 10,
        color: '#999',
        width: '100%',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
})

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    btnCategory: {
        borderRadius: 50,
        width: '26%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 0,
        paddingLeft: 0,
    },
    description: {
        fontSize: 10,
        color: '#999',
        width: '70%',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: '#eee'
    },   
});


const stylesItem = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        right: 0,
        top: -50,
        position: 'absolute',
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
    }, 
    logoContainer: {
        alignSelf: 'center',
        width: 0,
        height: 0,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
        borderRadius: 20,
        marginLeft: 50,
        paddingLeft: 50,
        marginTop: 0,
    },
    main: {
        width: '100%',
        flexDirection: 'column', 
        padding: 15,
        paddingLeft: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    description: {
        fontSize: 10,
        color: '#999',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: '#eee'
    },
    numbers: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantity: {
        alignItems: 'center',
    },
    amount: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    btnContainer: {
        flexDirection: 'row',
    },
    btnMinus: {
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    btnPlus: {
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
    quantityContainer: {
        flexDirection: 'row',
    },
    priceContainer: {
        flexDirection: 'row',
        width: '50%',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 15,
        width: '30%',
        backgroundColor: '#eee',
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        padding: 1,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceInput: {
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: '#eee',
        padding: 6,
        paddingTop: 1,
        paddingBottom: 1,
        width: '70%',
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        textAlign: 'center'
    },
    btnMinus2: {
        padding: 0,
        width: 40,
        height: 40,
        borderRadius: 100,
        right: 0,
        top: 20,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
})