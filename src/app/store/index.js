import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { take, put } from 'redux-saga/effects';
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import * as mutations from './mutations'

// Configuration
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:7777';
const DEFAULT_STATE = {
    session: {},
    comments: [],
    users: [],
    groups: [],
    items: []
};

// State Management
const reducer = combineReducers({
    session(userSession = DEFAULT_STATE.session, action) {
        let { type, authenticated, session } = action;
        switch (type) {
            case mutations.SET_STATE:
                return { ...userSession, id: action.state.session.id };
            case mutations.REQUEST_AUTHENTICATE_USER:
                return { ...userSession, authenticated: mutations.AUTHENTICATING };
            case mutations.PROCESSING_AUTHENTICATE_USER:
                return { ...userSession, authenticated };
            default:
                return userSession;
        }
    },
    comments: (comments = DEFAULT_STATE.comments, action) => {
        switch (action.type) {
            case mutations.ADD_ITEM_COMMENT:
                let { type, owner, item, content, id } = action;
                return [...comments, { owner, item, content, id }];
            case mutations.SET_STATE:
                return action.state.comments;
        }
        return comments;
    },
    users: (users = DEFAULT_STATE.users, action) => {
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.users;
        }
        return users;
    },
    groups: (groups = DEFAULT_STATE.groups, action) => {
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.groups;
        }
        return groups;
    },
    items(items = DEFAULT_STATE.items, action) {
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.items;
            case mutations.SET_ITEM_NAME:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, name: action.name } : item;
                });
            case mutations.SET_ITEM_GROUP:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, group: action.groupID } : item;
                });
            case mutations.SET_ITEM_INVENTORY:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, inventory: action.inventory } : item;
                });
            case mutations.SET_ITEM_IMG:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, img: action.img } : item;
                });
            case mutations.SET_ITEM_HIDDEN:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, isHidden: action.isHidden } : item;
                });
            case mutations.SET_ITEM_DELETED:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, isDeleted: action.isDeleted } : item;
                });
            case mutations.CREATE_ITEM:
                return [...items, {
                    id: action.itemID,
                    name: "new item",
                    group: action.groupID,
                    inventory: 0,
                    isHidden: false,
                    isDeleted: false
                }]
        }
        return items;
    }
});

/**
 * Sagas
 */

const sagas = [
    function* userAccountCreationSaga() {
        while (true) {
            const { username, password } = yield take(mutations.REQUEST_USER_ACCOUNT_CREATE);
            try {
                const { data } = yield axios.post(`${URL}/user/create`, { username, password });
                console.log(data); //TODO: Remove Console Log

                yield put(mutations.setState({ ...data.state, session: { id: data.userID } }));
                yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
                history.push('/');
            } catch (e) {
                yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
            }
        }
    },
    function* userAuthenticationSaga() {
        while (true) {
            const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
            try {
                const { data } = yield axios.post(`${URL}/authenticate`, { username, password });
                yield put(mutations.setState(data.state));
                yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
                    id: "U1", //TODO: Get ID from response (Not Mine)
                    token: data.token
                }));
                history.push('/');
            } catch (e) {
                yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED)); // Error While Logging In
            }
        }
    },
    function* userLogoutSaga() {
        while (true) {
            yield take(mutations.REQUEST_USER_LOGOUT);
            yield put(mutations.processAuthenticateUser(null)); // Indicates No Attempts to Authenticate
        }
    },
    function* itemCreationSaga() {
        while (true) {
            const { groupID } = yield take(mutations.REQUEST_ITEM_CREATE);
            const itemID = uuid();
            let mutation = mutations.createItem(itemID, groupID);
            yield axios.post(`${URL}/item/new`, {
                item: {
                    id: itemID,
                    name: "new item",
                    group: [groupID],
                    inventory: 0,
                    isHidden: false,
                    isDeleted: false
                }
            });
            yield put(mutation);
        }
    },
    function* itemModificationSaga() {
        while (true) {
            const item = yield take([mutations.SET_ITEM_NAME, mutations.SET_ITEM_GROUP, mutations.SET_ITEM_INVENTORY, 
                mutations.SET_ITEM_IMG, mutations.SET_ITEM_HIDDEN, mutations.SET_ITEM_DELETED]);
            axios.post(`${URL}/item/update`, {
                item: {
                    id: item.itemID,
                    name: item.name,
                    group: item.groupID,
                    inventory: item.inventory,
                    img: item.img,
                    isHidden: item.isHidden,
                    isDeleted: item.isDeleted
                }
            });
        }
    },
    function* commentCreationSaga() {
        while (true) {
            const comment = yield take(mutations.ADD_ITEM_COMMENT);
            if (comment.type) delete comment.type;
            axios.post(`${URL}/comment/new`, { comment })
        }
    }
];

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(createLogger(), sagaMiddleware));
sagas.forEach(saga => sagaMiddleware.run(saga));