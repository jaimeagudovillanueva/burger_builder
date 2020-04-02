import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliar from '../../../hoc/Auxiliar';

import styles from './SideDrawer.module.css';

const sideDrawer = props => {
    let attachedClasses = [styles['SideDrawer'], styles['Close']];
    if (props.open) {
        attachedClasses = [styles['SideDrawer'], styles['Open']];
    }
    return (
        <Auxiliar>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="10%"/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxiliar>
    );
}

export default sideDrawer;