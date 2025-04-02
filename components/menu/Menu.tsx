import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import MenuItem from "./menuItem";
import SearchBar from "../searchBar";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../context/menuContext";
import { MenuContextType } from "@/@types";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Menu () {
    const { menu, categories, categoryLookup } = useContext(MenuContext) as MenuContextType;
    const [loaded, error] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf')
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

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchBar/>
            </View>
            <ScrollView style={styles.hScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.horizontalContainer}>
                    <View style={styles.LWhiteSpace}/>
                        <Pressable onPress={()=>{categoryLookup('all')}} style={({pressed}) => [{backgroundColor: pressed ? '#8F481A' : '#f37b2d'},styles.category]}>
                            <Text style={styles.categoryText}>All</Text>
                        </Pressable>
                        {categories && categories.map(item => (
                        <Pressable onPress={()=>{categoryLookup(item.id)}} key={item.id} style={({pressed}) => [{backgroundColor: pressed ? '#8F481A' : '#f37b2d'},styles.category]}>
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </Pressable>
                        ))}
                    <View style={styles.whiteSpace}/>
                </View>
            </ScrollView>
            <View style={styles.menuItems}>
                {menu && menu.map(item => (<MenuItem key={item.id} item={item}/>))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    container: {
        display: 'flex',
        justifyContent: 'center',
        // marginRight: 20,
        // marginLeft: 20,
    },
    menuItems: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10,
        marginTop: 35,
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
})
