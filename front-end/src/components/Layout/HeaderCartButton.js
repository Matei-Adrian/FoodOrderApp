import React, { useContext } from 'react';

import classes from './HeaderCartButton.module.css';

import CartIcont from '../Cart/CartIcon';
import CartContext from '../../store/cart-contex';

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext);

    const numberOfCartItems = ctx.items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcont />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
};

export default HeaderCartButton;