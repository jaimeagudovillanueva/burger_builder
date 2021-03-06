import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import styles from './Toolbar.module.css';

const toolbar = props => (
    <header className={styles['Toolbar']}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo height="50%"/>
        <nav className={styles['DesktopOnly']}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;