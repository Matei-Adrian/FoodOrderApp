import React, { useEffect, useState } from "react";

import Card from '../UI/Card';
import MealItem from "./MealItem/MealItem";
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMeals = async () => {
        try {
            const response = await fetch('https://react-http-99086-default-rtdb.firebaseio.com/meals.json/');
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            }
            setMeals(loadedMeals);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading meals ...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className={classes.MealsError}>
                <p>{error}</p>
            </section>
        );
    }

    const itemMeals = meals.map((meal) => {
        return <MealItem key={meal.id} {...meal} />
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {itemMeals}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;