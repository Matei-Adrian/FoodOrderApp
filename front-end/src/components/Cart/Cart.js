import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import CartContext from "../../store/cart-contex";
import CartItem from "./CartItem";

const Cart = (props) => {
    const ctx = useContext(CartContext);

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        ctx.addIdem({ ...item, amount: 1 });
    };

    const cartItems = <ul className={classes['cart-items']}>{
        ctx.items.map(item =>
            <CartItem
                key={item.id}
                {...item}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />)}</ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${ctx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {ctx.items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;