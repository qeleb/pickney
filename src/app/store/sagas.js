import { take, put, select } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { history } from './history'
import * as mutations from './mutations';
const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:7777';

export function* itemCreationSaga() {
    while (true) {
        const { groupID } = yield take(mutations.REQUEST_ITEM_CREATE);
        const itemID = uuid();
        let mutation = mutations.createItem(itemID, groupID);
        yield axios.post(url + `/item/new`, {
            item: {
                id: itemID,
                name: "new item",
                group: [groupID],
                isHidden: false,
                isDeleted: false
            }
        });
        yield put(mutation);
    }
}

export function* commentCreationSaga() {
    while (true) {
        const comment = yield take(mutations.ADD_ITEM_COMMENT);
        axios.post(url + `/comment/new`, { comment })
    }
}

export function* itemModificationSaga() {
    while (true) {
        const item = yield take([mutations.SET_ITEM_GROUP, mutations.SET_ITEM_NAME, mutations.SET_ITEM_IMG, mutations.SET_ITEM_HIDDEN, mutations.SET_ITEM_DELETED]);
        axios.post(url + `/item/update`, {
            item: {
                id: item.itemID,
                group: item.groupID,
                name: item.name,
                img: item.img,
                isHidden: item.isHidden,
                isDeleted: item.isDeleted
            }
        });
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const { data } = yield axios.post(url + `/authenticate`, { username, password });
            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
                id: "U1", // todo... get ID from response
                token: data.token
            }));
            history.push(`/`);
        } catch (e) {
            /* catch block handles failed login */
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}


export function* userAccountCreationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_USER_ACCOUNT_CREATE);
        try {
            const { data } = yield axios.post(url + `/user/create`, { username, password });
            console.log(data); //TODO: Remove Console Log

            yield put(mutations.setState({ ...data.state, session: { id: data.userID } }));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
            history.push('/');
        } catch (e) {
            yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
        }
    }
}