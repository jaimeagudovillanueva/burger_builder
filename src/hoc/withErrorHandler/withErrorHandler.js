import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliar from '../Auxiliar/Auxiliar';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);
    
        return (
            <Auxiliar>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliar>
        ) 
    }
}

export default withErrorHandler;