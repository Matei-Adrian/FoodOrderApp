import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import CartContext from "../../store/cart-contex";

const Cart = (props) => {
    const ctx = useContext(CartContext);

    const cartItems = <ul className={classes['cart-items']}>{
        ctx.items.map(item => <li>{item.name} x {item.amount}</li>)}</ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${ctx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;