import React from 'react';

import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>FoodOrderApp</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table with food" />
            </div>
        </React.Fragment>
    );
}

export default Header;