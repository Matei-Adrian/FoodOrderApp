import { createContext, useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim().length === 0;
const isNotFiveDigits = value => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        city: true,
        postalCode: true
    });

    const nameInput = useRef();
    const addressInput = useRef();
    const postalInput = useRef();
    const cityInput = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInput.current.value;
        const enteredAddress = addressInput.current.value;
        const enteredPostal = postalInput.current.value;
        const enteredCity = cityInput.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPostalIsValid = !isNotFiveDigits(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid =
            enteredNameIsValid &&
            enteredAddressIsValid &&
            enteredCityIsValid &&
            enteredPostalIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            city: enteredCity,
            postalCode: enteredPostal
        });
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={`${classes.control} ${!formInputsValidity.name ? classes.invalid : ''}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInput} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.address ? classes.invalid : ''}`}>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' ref={addressInput} />
                {!formInputsValidity.address && <p>Please enter a valid address!</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.postalCode ? classes.invalid : ''}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInput} />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 character long)!</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.city ? classes.invalid : ''}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInput} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>Close</button>
                <button className={classes.submit} type='submit'>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;