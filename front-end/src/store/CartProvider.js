import { useReducer } from "react";
import CartContext from "./cart-contex";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = [...state.items, action.item];
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        };
    }
    if (action.type === 'REMOVE') {
        const selectedItemIndex = state.items.findIndex(item => item.id === action.id);
        const selectedItem = state.items[selectedItemIndex];

        const newTotalAmount = state.totalAmount - selectedItem.price;

        let updatedItems;

        if (selectedItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {
                ...selectedItem,
                amount: selectedItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[selectedItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addIdem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;