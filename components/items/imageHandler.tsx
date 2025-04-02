import { useState } from 'react';
import { Text, Image, View, StyleSheet, Pressable, Modal, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import NewItemInput from './newItemInput';

export default function ImagePickerUI() {
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset["uri"] | null>(null);
    const [modalVisible, setModalVisible] = useState(true);

    const pickImage = async (isCamera=false) => {

        let result;
        if (isCamera) {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        } else {
            // No permissions request is necessary for launching the image library
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        }

        if (!result.canceled && result.assets) {
            setImage(result.assets[0].uri);
        }
    };
    
    return (
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
                            <Pressable onPress={() => {pickImage(true)}} style={styles.btn}>
                                <FontAwesome size={24} name="camera" color={'white'} />
                                <Text style={styles.btnText}>Camera</Text>
                            </Pressable>
                            <Pressable onPress={() => {pickImage(false)}} style={styles.btn}>
                                <FontAwesome size={24} name="image" color={'white'} />
                                <Text style={styles.btnText}>Galery</Text>
                            </Pressable>
                            <Pressable style={styles.btn}>
                                <FontAwesome size={26} name="trash" color={'white'} />
                                <Text style={styles.btnText}>Remove</Text>
                            </Pressable>
                            {image && <Image source={{ uri: image }} style={styles.image} />}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
    }, 
    logoContainer: {
        alignSelf: 'center',
        width: 0,
        height: 0,
    },
    container2: {
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
        marginTop: 20,
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
    
});
