import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxiliar from '../Auxiliar/Auxiliar';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';

const Layout = props => {
    const [ showSideDrawer, setShowSideDrawer ] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Auxiliar>
                <Toolbar 
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth={props.isAuthenticated}
                    closed={sideDrawerCloseHandler} 
                    open={showSideDrawer}/>
                <main className={styles['Content']}>
                    {props.children}
                </main>
        </Auxiliar>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);