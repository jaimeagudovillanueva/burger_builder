import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios-orders';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

// We add the 'export' here in order to have the component isolated for testing, 
// without redux and withErrorHandler
export const BurgerBuilder = props => {
    const [ purchasing, setPurchasing] = useState(false);

    // This redux new hooks are an alternative to connect
    const dispatch = useDispatch();
    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
    // With useCallback we garantee that the function will only recreate when dispatch changes (second argument)
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

    const ings = useSelector(state => { return state.burgerBuilder.ingredients });
    const price = useSelector(state => { return state.burgerBuilder.totalPrice });
    const error = useSelector(state => { return state.burgerBuilder.error });
    const isAuthenticated = useSelector(state => { return state.auth.token !== null });

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = () => {
        const sum = Object.keys(ings)
            .map(igKey => {
                return ings[igKey];
            }).reduce((total, el) => total + el, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = null;
    if (ings) {
        orderSummary = <OrderSummary ingredients={ings}
            price={price}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}/>
    }

    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (ings) {
        burger = (
            <Auxiliar>
                <Burger ingredients={ings} removed={onIngredientRemoved}/>
                <BuildControls ingredientAdded={onIngredientAdded} 
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo} price={price}
                    purchaseable={updatePurchaseState()}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}/>
            </Auxiliar>);
    }

    return (
        <Auxiliar>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliar>
    );
}

export default withErrorHandler(BurgerBuilder, axios);