import React, { Component } from 'react';

import Auxiliar from '../Auxiliar/Auxiliar';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Auxiliar>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
                    <main className={styles['Content']}>
                        {this.props.children}
                    </main>
            </Auxiliar>
        );
    }
    
};

export default Layout;