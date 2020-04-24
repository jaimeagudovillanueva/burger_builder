import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    <Toolbar 
                        isAuth={this.props.isAuthenticated}
                        drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer 
                        isAuth={this.props.isAuthenticated}
                        closed={this.sideDrawerCloseHandler} 
                        open={this.state.showSideDrawer}/>
                    <main className={styles['Content']}>
                        {this.props.children}
                    </main>
            </Auxiliar>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);