import React from 'react';

import Auxiliar from '../../hoc/Auxiliar';
import styles from './Layout.module.css';

const layout = (props) => (
    <Auxiliar>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles['Content']}>
            {props.children}
        </main>
    </Auxiliar>
);

export default layout;