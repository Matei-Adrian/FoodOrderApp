import React, { useContext, useEffect, useState } from 'react';

import classes from './HeaderCartButton.module.css';

import CartIcont from '../Cart/CartIcon';
import CartContext from '../../store/cart-contex';

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const numberOfCartItems = ctx.items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const { items } = ctx;

    useEffect(() => {
        if (ctx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={`${classes.button} ${btnIsHighlighted ? classes.bump : ''}`} onClick={props.onClick} >
        <span className={classes.icon}>
            <CartIcont />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button >
};

export default HeaderCartButton;