import { FC, createContext, useReducer, useEffect, useState, Dispatch } from "react";
import AppReducer from './appReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuItemType, SaveDataType, MenuContextType, TransactionsType, categoryType, AddOnType } from '../@types';
import { getDateTime } from "../components/getDateTime";
import isNumeric from "@/hooks/isNumeric";
import getUUID, { handleText } from "@/components/getUUID";
import { ToastAndroid } from "react-native";

const initialState: SaveDataType = {
    menu: [],
    menuCategory: [],
    cart: [],
    transactionsRecord: [],
    details: [],
    printer: {},
    storeMenu: [],
    categories: [],
    addOns: [],
    init: false
};

const storeData = async (value: SaveDataType) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('initialState', jsonValue);
    } catch (e) {
      // saving error
    }
};

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('initialState');
      return jsonValue != null ? JSON.parse(jsonValue) : initialState;
    } catch (e) {
      // error reading value
    }
  };

// Initial State


// Create Context
export const MenuContext = createContext <MenuContextType | null>(null);

//Provider Component
export const MenuProvider: FC<{children: React.ReactNode}> = ({ children }) => {
    const [state, dispatch]: [state: SaveDataType, Dispatch<any>] = useReducer(AppReducer,initialState);
    const [modalVisible, setModalVisibility] = useState(false);
    const [modalCaller, setCaller] = useState<string | null>(null);
    const [ImageURI, setImageURI] = useState<string | null>(null);
    const [receipt, setReceipt] = useState('');
    const [categoryVisible, setCategoryVisibility] = useState(false);
    const [categoryCaller, setCategoryCaller] = useState<string | null>(null);
    const [itemCategory, setItemCategory] = useState<categoryType | null>(null)
    const [addOnsVisible, setAddOnsVisibility] = useState(false);
    const [selectedAddOn,setActiveAddOn] = useState<string | null>(null);
    const [activeAddOn,setActiveAddOnData] = useState<AddOnType | null>(null);
    const [cmdMode, setCMDMode] = useState("");
    const [adminActive,setAdminActive] = useState(false)

    useEffect(() => {
        async function rehydrate() {
          const storedState = await getData()
          if (storedState) {
            dispatch({ type: "hydrate", payload: storedState });
          }
        }
        
        rehydrate()
      }, []);
    
      useEffect(() => {
        storeData(state);
      }, [state])

    // Actions
    function setSelectedAddOn(id: string | null) {
        setActiveAddOn(id);
        if (id !== null) {
            setActiveAddOnData(state.addOns.filter(item => item.id === id)[0])
        } else {
            setActiveAddOnData(null);
        }
    }
    function resetRelays() {
        setCategoryCaller(null)
        setCaller(null)
        setImageURI(null)
        setItemCategory(null)
    }
    function deleteTransaction(tn: string) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: tn
        })
    }
    function createAddOnGroup(name: string) {
        dispatch({
            type: 'CREATE_ADD_ON_GROUP',
            payload: name
        });
    }
    function removeAddOnGroup(id: string) {
        dispatch({
            type: 'REMOVE_ADD_ON_GROUP',
            payload: id
        });
    }
    function sendCmd(cmd: string) {
        let mode = (cmdMode === 'dfb01144-bb5a-4b29-bcf5-19fe7ea1b1db');
        if (cmd === '//out' && !mode) {
            setAdminActive(false);
        }
        if (adminActive) {
            dispatch({
                type: 'CMD_TYPE',
                payload: cmd
            })
        }
        if (cmd === '//admin.mode' && !mode) {
            setCMDMode("dfb01144-bb5a-4b29-bcf5-19fe7ea1b1db");
        }
        if (mode) {
            setCMDMode('');
            if (async () => {return await handleText(cmd)}) {
                ToastAndroid.show('1',ToastAndroid.SHORT);
                setAdminActive(true);
            }
        }
        
    }
    function categoryLookup(categoryId: string) {
        dispatch({
            type: 'LOOKUP_CATEGORY',
            payload: categoryId
        });
    }
    function addCategory(category: string) {
        dispatch({
            type: 'ADD_CATEGORY',
            payload: category
        });
    }
    function deleteCategory(categoryId: string) {
        setItemCategory({id: 'All', name: 'All'});
        dispatch({
            type: 'DELETE_CATEGORY',
            payload: categoryId
        });
    }
    function addMenuItem(item: MenuItemType) {
        dispatch({
            type: 'ADD_ITEM',
            payload: item
        });
    }
    function deleteMenuItem(id: string) {
        dispatch({
            type: 'DELETE_ITEM',
            payload: id
        });
    }
    function modifyMenuItem(item: MenuItemType) {
        dispatch({
            type: 'MODIFY_ITEM',
            payload: item
        })
    }
    function addToCart(item: MenuItemType) {
        dispatch({
            type: 'ADD_TO_CART',
            payload: item
        });
    }
    function modifyCartAmount(id: string,isAdd: boolean) {
        dispatch({
            type: 'MODIFY_CART_AMOUNT',
            payload: {id: id, isAdd: isAdd}
        });
    }
    function removeCartItem (id: string) {
        dispatch({
            type: 'REMOVE_CART_ITEM',
            payload: id
        })
    }
    function checkout (total: number, cash: number, change: number) {
        if (isNumeric(String(change))) {
            let [ date , time ] = getDateTime(false);
            let transactionNow: TransactionsType = {total: total, cash: cash, change: change, date: date, time: time, tn: `${state.transactionsRecord.length}${getUUID()}`, orders: state.cart}
            dispatch({
                type: 'CHECKOUT',
                payload: transactionNow
            })
            return transactionNow
        } else {
            return null;
        }
    }
    function showDetails (transaction: TransactionsType) {
        dispatch({
            type: 'SHOW_DETAILS',
            payload: transaction
        })
    }
    function clearCartItems () {
        dispatch({
            type: 'CLEAR_CART'
        })
    }
    function setConnectedDevice (printer: any) {
        dispatch({
            type: 'SET_PRINTER',
            payload: printer
        })
    }
    function searchFor(text: string) {
        if (text !== "") {
            dispatch({
                type: 'SEARCH',
                payload: text
            })
        } else {
            dispatch({
                type: 'NOT_SEARCHING'
            })
        }
    }
    

    //comms
    function setCategoryVisible(isVisible: boolean, caller?: string | null) {
        setCategoryVisibility(isVisible)
        if (caller) {
            setCategoryCaller(caller);
        }
    }
    function getRelayCategory (reset: boolean = true) {
        let caller = categoryCaller;
        if (reset) {
            setCategoryCaller(null)
        }
        return itemCategory ? {item:itemCategory, caller:caller} : null
    }
    function sendRelayCategory (category: categoryType) {
        setItemCategory(category);
    }
    function accessReceipt (receiptText?: string) {
        if (!receiptText) {
            let temp = receipt;
            setReceipt('');
            return temp;
        }
        setReceipt(receiptText);
        return 'sent'
        
    }
    function setModalVisible(isVisible: boolean, caller?: string | null) {
        setModalVisibility(isVisible);
        if (caller) {
            setCaller(caller);
        }
    }
    function getModalState() {
        return {modalVisible: modalVisible, modalCaller: modalCaller}
    }
    function getRelayImage(reset: boolean = true) {
        let caller = modalCaller;
        if (reset) {
            // setCaller(null);
        }
        return ImageURI ? {item:ImageURI,caller :caller} : null
    }
    function setRelayImage(image: string | null) {
        setImageURI(image);
    }

    return (<MenuContext.Provider value={{
        menu: state.menu,
        menuCategory: state.menuCategory,
        cart: state.cart,
        transactionsRecord: state.transactionsRecord,
        details: state.details,
        printer: state.printer,
        storeMenu: state.storeMenu,
        categories: state.categories,
        addOns: state.addOns,
        modalVisible: modalVisible,
        modalCaller: modalCaller,
        categoryVisible: categoryVisible,
        categoryCaller: categoryCaller,
        itemCategory: itemCategory,
        uriImage: ImageURI,
        addOnsVisible: addOnsVisible,
        selectedAddOn: selectedAddOn,
        activeAddOn: activeAddOn,
        cmdMode: cmdMode,
        addCategory,
        deleteCategory,
        categoryLookup,
        addMenuItem,
        deleteMenuItem,
        modifyMenuItem,
        addToCart,
        modifyCartAmount,
        removeCartItem,
        checkout,
        showDetails,
        clearCartItems,
        setConnectedDevice,
        searchFor,
        setModalVisible,
        getModalState,
        getRelayImage,
        setRelayImage,
        accessReceipt,
        setCategoryVisible,
        getRelayCategory,
        sendRelayCategory,
        resetRelays,
        setAddOnsVisibility,
        setSelectedAddOn,
        createAddOnGroup,
        removeAddOnGroup,
        sendCmd,
        deleteTransaction
    }}>
        {children}
    </MenuContext.Provider>);
}