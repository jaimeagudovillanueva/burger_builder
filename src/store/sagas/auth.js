import { put, delay, all} from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../actions/index';

export function* logoutSaga() {
    // We can use call from 'redux-saga/effects' to call removeItem from localStorage
    // in order to easy up the testing with mocks
    // yield call([localStorage, 'removeItem'], "token");
    // yield call([localStorage, 'removeItem'], "expirationDate");
    // yield call([localStorage, 'removeItem'], "userId");
    yield all([
        localStorage.removeItem('token'),
        localStorage.removeItem('expirationDate'),
        localStorage.removeItem('userId')
    ]);
   
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0Z-72dFLvHILGktFCfGid2Cpk8wJsEFA';
    if (action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0Z-72dFLvHILGktFCfGid2Cpk8wJsEFA';
    }

    try {
        // This yield will make respone waits for the promise returned by axios so we no longer need then or error
        const response = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield all([
            localStorage.setItem('token', response.data.idToken),
            localStorage.setItem('expirationDate', expirationDate),
            localStorage.setItem('userId', response.data.localId)
        ]);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.logout());
        }
    }
}