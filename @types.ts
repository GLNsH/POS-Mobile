export interface MenuItemType {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    amount: number;
    categoryId: string;
}

export type itemType = {
    item: MenuItemType;       
}

export interface TransactionsType {
    date: string;
    time: string;
    tn: string;
    total: number;
    orders: MenuItemType[];
    cash: number;
    change: number;
}

export type TransactionPropType = {
    transaction: TransactionsType;
}

export interface categoryType {
    id: string;
    name: string;
}
let a = {
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
}

export interface ChoicesSelectionType {
    name: string;
    id: string;
}

export interface AddOnChoicesType {
    selection: ChoicesSelectionType[];
    id: string;
}

export interface AddOnOptionsType {
    name: string;
    price: number;
    id: string;
}

export interface AddOnType {
    choices: AddOnChoicesType[];
    options: AddOnOptionsType[];
    id: string;
    name: string;
}

// {date: date, time: time, tn: `${state.transactionsRecord.length}`, total: action.payload, orders: state.cart}
export interface SaveDataType {
    menu: MenuItemType[];
    menuCategory: MenuItemType[];
    cart: MenuItemType[],
    transactionsRecord: TransactionsType[],
    details: TransactionsType[],
    printer: any,
    storeMenu: MenuItemType[],
    categories: categoryType[]
    addOns: AddOnType[],
    init: boolean,
}

export interface fetchCategoryType {item: categoryType, caller: string | null}
export interface fetchImageType {item: string, caller: string | null}

export type MenuContextType = {
    menu: MenuItemType[];
    menuCategory: MenuItemType[];
    cart: MenuItemType[];
    transactionsRecord: TransactionsType[];
    details: TransactionsType[];
    printer: any;
    storeMenu: MenuItemType[];
    categories: categoryType[],
    addOns: AddOnType[],
    activeAddOn: AddOnType | null,
    modalVisible: boolean;
    modalCaller: string | null;
    categoryVisible: boolean;
    categoryCaller: string | null;
    itemCategory: categoryType | null;
    uriImage: string | null;
    addOnsVisible: boolean;
    selectedAddOn: string | null;
    cmdMode: string;
    addCategory: (category: string) => void;
    deleteCategory: (categoryId: string) => void;
    categoryLookup: (categoryId: string) => void;
    addMenuItem: (item: MenuItemType) => void;
    deleteMenuItem: (id: string) => void;
    modifyMenuItem: (item: MenuItemType) => void;
    addToCart: (item: MenuItemType) => void;
    modifyCartAmount: (id: string, isAdd: boolean) => void;
    removeCartItem: (id: string) => void;
    checkout: (total: number, cash: number, change: number) => TransactionsType | null;
    showDetails: (transaction: TransactionsType) => void;
    clearCartItems: () => void;
    setConnectedDevice: (printer: any) => void;
    searchFor: (text: string) => void;
    setModalVisible: (isVisible: boolean, caller?: string | null) => void;
    getModalState: () => ModalState;
    getRelayImage: (reset?: boolean) => fetchImageType | null;
    setRelayImage: (image: string | null) => void;
    accessReceipt: (receiptText?: string) => string;
    setCategoryVisible: (isVisible: boolean, caller?: string | null) => void;
    getRelayCategory: (reset?: boolean) => fetchCategoryType | null;
    sendRelayCategory: (category: categoryType) => void;
    resetRelays: () => void;
    setAddOnsVisibility: (isVisible: boolean) => void;
    setSelectedAddOn: (selected: string | null) => void;
    createAddOnGroup: (name: string) => void;
    removeAddOnGroup: (id: string) => void;
    sendCmd: (cmd: string) => void;
    deleteTransaction: (tn: string) => void;
}

export type ModalState = {
    modalVisible: boolean;
    modalCaller: string | null;
}

// function deleteMenuItem(id) {
// function addToCart(item) {
// function modifyCartAmount(id,isAdd) {
// function removeCartItem (id) {
// function checkout (total) {
// function showDetails (orders) {
// function clearCartItems () {
// function setConnectedDevice (printer) {
// function searchFor(text) {
