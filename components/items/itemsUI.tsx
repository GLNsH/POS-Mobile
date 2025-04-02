import { useState } from 'react';
import { Text, Image, View, StyleSheet, Pressable, Modal, TextInput, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import placeholder from '../../assets/imgs/zira_logo.jpg';
import Item from "./item";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../context/menuContext";
import { MenuContextType, categoryType } from '../../@types';
import isNumeric from '@/hooks/isNumeric';
import SearchBar from '../searchBar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AddOnsModal from './addOnsModal';
import getUUID from '../getUUID';

SplashScreen.preventAutoHideAsync();

export default function ItemsUI () {
    const { menu, setAddOnsVisibility, categoryLookup, resetRelays, deleteCategory, addMenuItem, setModalVisible, sendRelayCategory, modalVisible, modalCaller, categoryVisible, categoryCaller, setCategoryVisible, setRelayImage, addCategory, categories } = useContext(MenuContext) as MenuContextType;
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset["uri"] | null>(null);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('All');
    const [categoryId,setNewCategoryId] = useState('All');
    const [newPrice, setNewPrice] = useState('');
    const [categoryText, setCategoryText] = useState('');
    const [isCategoryDisabled, enableCreateCategory] = useState(true);
    const [loaded, error] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf')
      });
    
      // Expo Router uses Error Boundaries to catch errors in the navigation tree.
      useEffect(() => {
        if (error) throw error;
      }, [error]);
    
      useEffect(() => {
        if (loaded) {
          SplashScreen.hideAsync();
        }
      }, [loaded]);
    
      if (!loaded) {
        return null;
      }

    function setNewItemCategory (item: categoryType) {
        if (categoryCaller) {
            sendRelayCategory({id: item.id,name:item.name});
        } else {
            setNewCategoryId(item.id);
            setNewDescription(item.name);
        }
        setCategoryVisible(false);
    }

    function handleSubmit () {
        if (newName && newDescription && isNumeric(newPrice)) {
            let tempUUID = getUUID()
            let tempID = `${newName}${newPrice}${tempUUID}`
            addMenuItem({ id: tempID, name: newName, description: newDescription, price: Number(newPrice), image: image, amount: 1, categoryId: categoryId});
            setImage(null);
            setNewName('');
            setNewPrice('');
            resetRelays()
        } else {
            Alert.alert('','Please enter required information.')
        }
    }

    function setupNumber(str: string) {
        if (str === "") {
            setNewPrice(str);
        } else if (isNumeric(str)) {
            setNewPrice(str);
        } else {
            setNewPrice(newPrice);
        }
    }

    const pickImage = async (mode="camera") => {

        let result;
        if (mode === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        } else if (mode === 'delete') {
            result = {canceled: false, assets: [{uri: "REMOVE_IMAGE"}]}
        } else {
            // No permissions request is necessary for launching the image library
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        }

        if (!result.canceled) {
            // id is okay 
            // uri all good
            if (modalCaller) {
                setRelayImage(result.assets[0].uri);
            } else {
                setImage(result.assets[0].uri);
            }
            setModalVisible(false,null);
        }
    };

    function createCategory () {
        if (categoryText.replaceAll(' ', '') !== '') {
            addCategory(categoryText);
            setCategoryText('')
        }
    }

    function setCreateCategory (text: string) {
        if (text.replaceAll(' ', '') !== '') {
            enableCreateCategory(false);
        } else {
            enableCreateCategory(true)
        }
        setCategoryText(text)
    }


    return (
    <View  style={styles.containerMain}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() => {setModalVisible(false)}}>
                <View style={styles.centeredView}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Upload Image</Text>
                        <View style={styles.innerContainer}>
                            <Pressable onPress={() => {pickImage("camera")}} style={styles.btn}>
                                <FontAwesome size={24} name="camera" color={'white'} />
                                <Text style={styles.btnText}>Camera</Text>
                            </Pressable>
                            <Pressable onPress={() => {pickImage("galery")}} style={styles.btn}>
                                <FontAwesome size={24} name="image" color={'white'} />
                                <Text style={styles.btnText}>Galery</Text>
                            </Pressable>
                            <Pressable onPress={() => {pickImage("delete")}} style={styles.btn}>
                                <FontAwesome size={26} name="trash" color={'white'} />
                                <Text style={styles.btnText}>Remove</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
        <Modal
            animationType="fade"
            transparent={true}
            visible={categoryVisible}
            onRequestClose={() => {
                setCategoryVisible(!categoryVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() => {setCategoryVisible(false)}}>
                <View style={stylesContainer.centeredView}>
                    <View style={stylesContainer.container}>
                        <TouchableWithoutFeedback>
                            <View style={stylesContainer.container2}>
                                <Text style={stylesContainer.title}>Select Category</Text>
                                <View style={stylesContainer.innerContainer}>
                                    <View style={stylesContainer.inlineContainer}>
                                        <TextInput value={categoryText} onChangeText={text => setCreateCategory(text)} style={stylesContainer.textInput} placeholder='Category'/>
                                        <Pressable disabled={isCategoryDisabled} onPress={createCategory} style={({pressed}) => [{backgroundColor: pressed ? '#8F481A' : '#f37b2d', opacity: isCategoryDisabled ? 0.5 : 1 },stylesContainer.btn]}>
                                            <Text style={stylesContainer.btnText}>CREATE</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <ScrollView style={{maxHeight: 300, backgroundColor: '#eee', borderRadius: 10}}>
                                    <TouchableWithoutFeedback>
                                        <View style={stylesContainer.flex}>
                                        {categories && categories.map(item => (
                                            <View key={item.id} style={stylesContainer.category}>
                                                <Pressable onPress={() => setNewItemCategory(item)} style={({pressed}) => [{backgroundColor: pressed ? '#4744fc' : '#448efc'},stylesContainer.categoryBtn]}>
                                                    <Text style={stylesContainer.categoryText}>{item.name}</Text>
                                                </Pressable>
                                                <Pressable onPress={() => deleteCategory(item.id)} style={({pressed}) => [{backgroundColor: pressed ? '#193661' : '#00000000'},stylesContainer.categoryDelete]}>
                                                    <FontAwesome name="close" color={'white'} size={16}/>
                                                </Pressable>
                                            </View>
                                        ))}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
        <AddOnsModal/>
        <View>
            <View style={hStyle.container}>
                <View style={hStyle.containerInner}>
                    <Text style={hStyle.text}>CREATE NEW ITEM</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={image ? {uri:image} : placeholder}></Image>
                    <Pressable onPress={()=> {resetRelays();setModalVisible(true);}} style={({ pressed }) => [{ backgroundColor: pressed ? '#aaa' : '#eee' }, styles.btnMinus ]}>
                        <FontAwesome size={16} name="camera" color={'#444'} />
                    </Pressable>
                </View>
                <View style={styles.main}>
                    <View style={styles.itemDetails}>
                        <TextInput style={styles.name} placeholder='Name' onChangeText={newText => setNewName(newText)} value={newName}/>
                        <View style={styles.itemRow}>
                            <Pressable
                            disabled={true}
                            onPress={() => {
                                resetRelays();
                                // setAddOnsVisibility(true)
                                // here it open modal for add-ons
                                // if add-ons is blank []
                                // them onPress addToCart does not open modal for add ons
                                // else 
                                // then it open modal for add ons and then add it to cart

                                // add-ons might be the following:
                                // 1. different types of the item (takoyaki 10pcs or takoyaki 5pcs)
                                // 2. with or without drinks (takoyaki w/ drinks), and, or 
                                // 3. plain add-ons (additional egg)

                                // add ons may or may not cost anything, like mix and match
                                // the customer may choose which they want in a certain combo
                                // but their choosen selection doesn't affect the cost
                                // if it affects the cost then it is considered an add-on
                            }} 
                            style={({ pressed }) => [{ backgroundColor: pressed ? '#555' : '#777', opacity: 0.5 }, styles.btnCategory ]}
                            >
                                <FontAwesome name="cog" size={20} color={'white'} />
                            </Pressable>
                            <Pressable onPress={() => {resetRelays();setCategoryVisible(true)}} style={({ pressed }) => [{ backgroundColor: pressed ? '#555' : '#777' }, styles.btnCategory ]}>
                                <FontAwesome name="link" size={20} color={'white'} />
                            </Pressable>
                            <TextInput editable={false} style={styles.description} placeholder='Category' onChangeText={newText => setNewDescription(newText)} value={newDescription}/>
                        </View>
                    </View>
                    <View style={styles.numbers}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>₱</Text>
                            <TextInput keyboardType='numeric' maxLength={7} style={styles.priceInput} placeholder='Price' onChangeText={newText => setupNumber(newText)} value={newPrice}/>
                        </View>
                        <View style={styles.quantityContainer}>
                            <Pressable onPress={()=> {handleSubmit()}} style={({ pressed }) => [{ backgroundColor: pressed ? '#386641' : '#6a994e' }, styles.btnPlus ]}>
                                <FontAwesome size={16} name="save" color={'white'} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        <View>
            <View style={styler.searchBar}>
                <SearchBar/>
            </View>
            <ScrollView style={styler.hScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styler.horizontalContainer}>
                    <View style={styler.LWhiteSpace}/>
                        <Pressable onPress={()=>{categoryLookup('all')}} style={({pressed}) => [{backgroundColor: pressed ? '#8F481A' : '#f37b2d'},styler.category]}>
                            <Text style={styler.categoryText}>All</Text>
                        </Pressable>
                        {categories && categories.map(item => (
                        <Pressable onPress={()=>{categoryLookup(item.id)}} key={item.id} style={({pressed}) => [{backgroundColor: pressed ? '#8F481A' : '#f37b2d'},styler.category]}>
                            <Text style={styler.categoryText}>{item.name}</Text>
                        </Pressable>
                        ))}
                    <View style={styler.whiteSpace}/>
                </View>
            </ScrollView>
        </View>
        <View style={styler.container}>
            {menu && menu.map(item => (<Item key={item.id} item={item}/>))}
        </View>
    </View>
    
)}

const hStyle = StyleSheet.create({
    containerInner: {
        borderTopColor: 'black',
        borderTopWidth: 1,
        width: '100%',
        paddingTop: 3,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
    },
    text: {
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 18,
    }
})

const styler = StyleSheet.create({
    container: {
        flexDirection: 'column',
        rowGap: 10,
        marginTop: 10,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 20,
    },
    hScroll: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    LWhiteSpace: {
        width: 2,
    },
    whiteSpace: {
        width: 10,
    },
    horizontalContainer: {
        display: 'flex',
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
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
})


const stylesContainer = StyleSheet.create({
    scroll: {
        maxHeight: 350,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 5,
        paddingLeft: 5,
    },
    flex: {
        flex: 1,
        width: 290,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        columnGap: 10,
        rowGap: 5,
        paddingTop: 10,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        color: 'white',
    },
    categoryBtn: {
        height: 35,
        minWidth: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container2: {
        rowGap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        paddingTop: 15,
        
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
        fontWeight: 'bold',
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

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    itemDetails: {
    },
    btnCategory: {
        borderRadius: 50,
        width: '19%',
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
        width: '58%',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: '#eee'
    },
    category: {
        height: 25,
        minWidth: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 12,
        paddingLeft: 12,
        borderRadius: 50,
    },
    categoryText: {
        color: 'black',
        fontSize: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
      },
    container: {
        rowGap: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 15,
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
    containerMain: {
        rowGap: 5,
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        paddingTop: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    btn: {
        width: 60,
        height: 60,
        backgroundColor: '#888',
        padding: 5,
        paddingBottom: 0, 
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 11,
        color: 'white',
    },
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
    container2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 0,
        paddingLeft: 115,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    main: {
        width: '100%',
        flexDirection: 'column', 
        padding: 15,
        paddingTop: 5,
        paddingLeft: 10,
    },
    logoContainer: {
        alignSelf: 'center',
        width: 0,
        height: 0,
        paddingBottom: 10,
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
        display: 'flex',
        flexDirection: 'row',
    },
    btnMinus: {
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
    btnPlus: {
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        width: '70%',
        alignItems:'center',
        justifyContent: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-end'
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
    
});


