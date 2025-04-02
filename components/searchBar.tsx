import { Pressable, StyleSheet, TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useContext, useEffect} from "react";
import { MenuContext } from "../context/menuContext";
import { MenuContextType } from '../@types';

export default function SearchBar () {
    const { searchFor, sendCmd, cmdMode } = useContext(MenuContext) as MenuContextType;
    const [searchText,setSearch] = useState('');
    const [isSearching,setSearching] = useState(false);

    function searchThis (value: string) {
        setSearch(value);
        searchFor(value);
        if (value !== '') {
            setSearching(true);
        } else {
            setSearching(false);
        }
    }

    let secureMode = (cmdMode === 'dfb01144-bb5a-4b29-bcf5-19fe7ea1b1db')

    return (
    <View style={styles.container}>
        <TextInput secureTextEntry={secureMode} style={styles.input} placeholder="Search" value={searchText} onChangeText={(value) => {searchThis(value)}}></TextInput>
        <View style={[{display: isSearching ? 'flex' : 'none'},styles.gay]}>
            <Pressable onPress={() => {searchThis('')}} style={({ pressed }) => [{ backgroundColor: pressed ? '#eee' : '#fff' }, styles.btnLogo]} disabled={!isSearching}>
                <FontAwesome size={20} name="close" color={'black'}/>
            </Pressable>
        </View>
        <Pressable onPress={() => {sendCmd(searchText);if(secureMode){searchThis('')}}} style={styles.btn}>
            <FontAwesome size={24} name="search" color={'black'}/>
        </Pressable>
    </View>
)}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 50,
    },
    btn: {
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'white',
        padding: 7,
        height: 40,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 10,
        height: 40,
        width: '75%',
    },
    btnLogo: {
      position: 'absolute',
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 50,
    },
    gay: {
        width: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})