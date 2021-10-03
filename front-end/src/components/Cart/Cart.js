import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import CartContext from "../../store/cart-contex";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const ctx = useContext(CartContext);
    const [orderClicked, setOrderClicked] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        ctx.addIdem({ ...item, amount: 1 });
    };

    const orderClickedHandler = () => {
        setOrderClicked((prevState) => {
            return !prevState;
        });
    };

    const submitOrderHandler = async (userData) => {
        setSubmitting(true);
        await fetch('https://react-http-99086-default-rtdb.firebaseio.com/orders.json/', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: ctx.items
            })
        });
        setSubmitting(false);
        setDidSubmit(true);
        ctx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>{
        ctx.items.map(item =>
            <CartItem
                key={item.id}
                {...item}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />)}</ul>;

    let content = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {ctx.items.length > 0 && <button className={classes.button} onClick={orderClickedHandler}>Order</button>}
        </div>
    );
    if (orderClicked) {
        content = <Checkout onConfirm={submitOrderHandler} onClose={props.onClose} />;
    }

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${ctx.totalAmount.toFixed(2)}</span>
            </div>
            {content}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!submitting && !didSubmit && cartModalContent}
            {submitting && isSubmittingModalContent}
            {!submitting && didSubmit && didSubmitModalContent}
        </Modal >
    );
};

export default Cart;