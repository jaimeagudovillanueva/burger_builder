import React from 'react';

import styles from './Modal.module.css';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';
import Backdrop from '../Backdrop/Backdrop';

// This will be used by React.memo to determine if the component should render, 
// it will render when the result of this function is false
const areEqual = (prevProps, nextProps) => {
   return nextProps.show === prevProps.show;
}

const modal = props => (
    <Auxiliar>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={styles['Modal']}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </Auxiliar>
);

export default React.memo(modal, areEqual);