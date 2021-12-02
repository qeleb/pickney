import { combineReducers } from 'redux';
import * as mutations from './mutations'

let defaultState = {
    session: {},
    comments: [],
    users: [],
    groups: [],
    items: []
};

export const reducer = combineReducers({
    session(userSession = defaultState.session, action) {
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
    comments: (comments = defaultState.comments, action) => {
        switch (action.type) {
            case mutations.ADD_TASK_COMMENT:
                let { type, owner, item, content, id } = action;
                return [...comments, { owner, item, content, id }];
            case mutations.SET_STATE:
                return action.state.comments;
        }
        return comments;
    },
    users: (users = defaultState.users, action) => {
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.users;
        }
        return users;
    },
    groups: (groups = defaultState.groups, action) => {
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.groups;
        }
        return groups;
    },
    items(items = defaultState.items, action) {
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.items;
            case mutations.SET_TASK_COMPLETE:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, isHidden: action.isHidden } : item;
                });
            case mutations.SET_TASK_GROUP:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, group: action.groupID } : item;
                });
            case mutations.SET_TASK_NAME:
                return items.map(item => {
                    return (item.id === action.itemID) ? { ...item, name: action.name } : item;
                });
            case mutations.CREATE_TASK:
                return [...items, {
                    id: action.itemID,
                    name: "new item",
                    group: action.groupID,
                    owner: action.ownerID,
                    isHidden: false
                }]
        }
        return items;
    }
});