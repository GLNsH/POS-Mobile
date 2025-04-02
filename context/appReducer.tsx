import { SaveDataType } from '../@types';
import { ToastAndroid } from 'react-native';
import getUUID from '@/components/getUUID';

export default (state: SaveDataType, action: any): SaveDataType => {
    function cmdType (): SaveDataType {
        if (action.payload === '//debug1') {
            ToastAndroid.show('debug_state_1',ToastAndroid.SHORT);
            // @ts-ignore
            return {
                menu: state.menu ? state.menu : [],
                menuCategory: state.menuCategory ? state.menuCategory : [],
                cart: state.cart ? state.cart : [],
                transactionsRecord: state.transactionsRecord ? state.transactionsRecord : [],
                details: [],
                printer: state.printer ? state.printer : {},
                storeMenu: state.storeMenu? state.storeMenu : [], 
                categories: state.categories ? state.categories : [],
            }
        }
        if (action.payload === '//debug') {
            ToastAndroid.show('debug_state_0',ToastAndroid.SHORT);
            // @ts-ignore
            return {}
        } else if (action.payload === '//update') {
            ToastAndroid.show('Updated the data structure!',ToastAndroid.SHORT);
            return {
                menu: state.menu ? state.menu : [],
                menuCategory: state.menuCategory ? state.menuCategory : [],
                cart: state.cart ? state.cart : [],
                transactionsRecord: state.transactionsRecord ? state.transactionsRecord : [],
                details: state.details ? state.details : [],
                printer: state.printer ? state.printer : {},
                storeMenu: state.storeMenu? state.storeMenu : [], 
                categories: state.categories ? state.categories : [],
                addOns: state.addOns ? state.addOns : [],
                init: true
            }
        } else if (action.payload === '//state') {``
            // let confirm = (state.menu && state.menuCategory && state.cart && state.transactionsRecord && state.details && state.storeMenu && state.categories && state.addOns && state.init)
            ToastAndroid.show(
                `${state.menu ? 1 : 0}${state.menuCategory ? 1 : 0}${state.cart ? 1 : 0}${state.transactionsRecord ? 1 : 0}${state.details ? 1 : 0}${state.printer ? 1 : 0}${state.storeMenu ? 1 : 0}${state.categories ? 1 : 0}${state.addOns ? 1 : 0}${state.init ? 1 : 0}`,
                ToastAndroid.LONG
            );
            
            return {
                menu: state.menu,
                menuCategory: state.menuCategory,
                cart: state.cart,
                transactionsRecord: state.transactionsRecord,
                details: state.details,
                printer: state.printer,
                storeMenu: state.storeMenu,
                categories: state.categories,
                addOns: state.addOns,
                init: state.init
            }
        } else if (action.payload === '//reset.data.confirm') {
            ToastAndroid.show('Resseting the data structure!',ToastAndroid.SHORT);
            return {
                menu: [],
                menuCategory: [],
                cart: [],
                transactionsRecord: [],
                details: [],
                printer: {},
                storeMenu: [],
                categories: [],
                addOns: [],
                init: true,
            }
        } else {
            return state
        }
    }
    if ('LOOKUP_CATEGORY SEARCH NOT_SEARCHING'.includes(action.type)) {
        switch(action.type) {
            case 'LOOKUP_CATEGORY': {
                if (action.payload.toLowerCase() === 'all') {
                    return {
                        ...state,
                        menu: state.storeMenu,
                        menuCategory: state.storeMenu
                    }    
                }
                let currentState = [...state.storeMenu.filter(item => item.categoryId.toLowerCase().includes(action.payload.toLowerCase()))]
                return {
                    ...state,
                    menuCategory: currentState,
                    menu: currentState
                }
            }
            case "SEARCH": {
                return {
                    ...state,
                    menu: [...state.menuCategory.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()))]
                }
            }
            case "NOT_SEARCHING": {
                return {
                    ...state,
                    menu: state.menuCategory
                }
            }
        }
    }
    if (state.init) {
        switch(action.type) {
            case 'CREATE_ADD_ON_GROUP': {
                ToastAndroid.show(`Added ${action.payload} add-on group.`,ToastAndroid.SHORT)
                return {
                    ...state,
                    addOns: [...state.addOns, {choices: [], options: [], id: `${action.payload}${state.addOns.length}${getUUID()}`, name: action.payload}]
                }
            }
            case 'REMOVE_ADD_ON_GROUP': {
                ToastAndroid.show(`Removed add-on group.`,ToastAndroid.SHORT)
                return {
                    ...state,
                    addOns: state.addOns.filter(item => item.id !== action.payload)
                }
            }
            case 'ADD_CATEGORY': {
                return {
                    ...state,
                    categories: [...state.categories, {id: `${action.payload}${state.categories.length}${getUUID()}`, name: action.payload}]
                }
            }
            case 'DELETE_CATEGORY': {
                // payload: string categoryId
                let storeMenuHomo = state.storeMenu.filter(item => item.categoryId === action.payload)
                let storeMenuHetero = state.storeMenu.filter(item => item.categoryId !== action.payload)
                for (let i = 0; storeMenuHomo.length > i; i++) {
                    storeMenuHomo[i].description = 'All'
                    storeMenuHomo[i].categoryId = 'All'
                }
                return {
                    ...state,
                    categories: state.categories.filter(item => item.id !== action.payload),
                    menu: [...storeMenuHomo, ...storeMenuHetero],
                    storeMenu: [...storeMenuHomo, ...storeMenuHetero],
                    menuCategory: [...storeMenuHomo, ...storeMenuHetero],
                    cart: []
                }
            }
            case 'ADD_ITEM': {
                return {
                    ...state,
                    menu: [ action.payload, ...state.menu,],
                    storeMenu: [action.payload,...state.storeMenu],
                    menuCategory: [action.payload,...state.storeMenu]
                }
            }
            case 'DELETE_ITEM': {
                return {
                    ...state,
                    menu: state.menu.filter(item => item.id !== action.payload),
                    storeMenu: state.storeMenu.filter(item => item.id !== action.payload)
                }
            }
            case 'MODIFY_ITEM': {
                let menuIndex = state.menu.findIndex(item => item.id === action.payload.id);
                let storeIndex = state.storeMenu.findIndex(item => item.id === action.payload.id);
                let cartIndex = state.cart.findIndex(item => item.id === action.payload.id);
                let cartItem = state.cart.at(cartIndex);
                if (cartIndex >= 0 && cartItem) { 
                    cartItem.name = action.payload.name
                    cartItem.description = action.payload.description
                    cartItem.categoryId = action.payload.categoryId
                    cartItem.price = action.payload.price
                    cartItem.image = action.payload.image
                    return {
                        ...state,
                        menu: [...(state.menu.slice(0,menuIndex)), action.payload ,...(state.menu.slice(menuIndex+1))],
                        storeMenu: [...(state.storeMenu.slice(0,storeIndex)), action.payload ,...(state.storeMenu.slice(storeIndex+1))],
                        cart: [...(state.storeMenu.slice(0,cartIndex)), cartItem ,...(state.storeMenu.slice(cartIndex+1))]
                    }
                }
                return {
                    ...state,
                    menu: [...(state.menu.slice(0,menuIndex)), action.payload ,...(state.menu.slice(menuIndex+1))],
                    storeMenu: [...(state.storeMenu.slice(0,storeIndex)), action.payload ,...(state.storeMenu.slice(storeIndex+1))]
                }
            }
            case 'ADD_TO_CART': {
                ToastAndroid.show(`Added ${action.payload.name} to cart.`,ToastAndroid.SHORT);
                let duplicateIndex = state.cart.findIndex(item => item.id === action.payload.id);
                let duplicate = state.cart.at(duplicateIndex);
                if (duplicateIndex >= 0 && duplicate) {
                    duplicate.amount += 1;
                    return {
                        ...state,
                        cart: [...(state.cart.slice(0,duplicateIndex)), duplicate ,...(state.cart.slice(duplicateIndex+1))]
                    }
                }
                action.payload.amount = 1;
                return {
                    ...state,
                    cart: [action.payload, ...state.cart]
                }
            }
            case 'MODIFY_CART_AMOUNT': {
                let itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
                let item = state.cart.at(itemIndex);
                if (item === undefined) { return state }
                if (action.payload.isAdd) {
                    item.amount += 1;
                } else if ((item.amount - 1) >= 1) {
                    item.amount -= 1;
                }
                return {
                    ...state,
                    cart: [...(state.cart.slice(0,itemIndex)), item ,...(state.cart.slice(itemIndex+1))]
                }
            }
            case 'REMOVE_CART_ITEM': {
                return {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload)
                }
            }
            case 'CHECKOUT': {
                return {
                    ...state,
                    cart: [],
                    transactionsRecord: [action.payload, ...state.transactionsRecord],
                }
            }
            case 'DELETE_TRANSACTION': {
                return {
                    ...state,
                    transactionsRecord: state.transactionsRecord.filter(item => item.tn !== action.payload)
                }
            }
            case "SHOW_DETAILS": {
                return {
                    ...state,
                    details: [action.payload]
                }
            }
            case "CLEAR_CART": {
                return {
                    ...state,
                    cart: []
                }
            }
            case "SET_PRINTER": {
                return {
                    ...state,
                    printer: action.payload
                }
            }
            case "hydrate": {
                return action.payload
            }

            case 'CMD_TYPE': {
                return cmdType()
            }
            
            default: {
                return state;
            }
        }
    } else {
        if ('MODIFY_ITEM ADD_TO_CART SHOW_DETAILS ADD_CATEGORY ADD_ITEM CREATE_ADD_ON_GROUP DELETE_ITEM DELETE_TRANSACTION'.includes(action.type)) {ToastAndroid.show('E400',ToastAndroid.SHORT)}
        switch (action.type) {
            case 'CMD_TYPE': {
                return cmdType()
            }
            case "hydrate": {
                return action.payload
            }
            default: {
                return state;
            }
        }
    }
}

