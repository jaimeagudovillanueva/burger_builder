import React from 'react';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.module.css';

const burger = props => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} removed={() => props.removed(igKey)}/>
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles['Burger']}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

// If we wrap the class with withRouter we can have access to Router params such as history, 
// match and location. This is needed because we only have access to these params in components 
// mapped directly with Router
export default withRouter(burger);