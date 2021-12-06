export const CREATE_ITEM = 'CREATE_ITEM';
export const REQUEST_ITEM_CREATE = 'REQUEST_ITEM_CREATE';

export const SET_ITEM_NAME = 'SET_ITEM_NAME';
export const SET_ITEM_DESC = 'SET_ITEM_DESC';
export const SET_ITEM_IMG = 'SET_ITEM_IMG';
export const SET_ITEM_GROUP = 'SET_ITEM_GROUP';
export const SET_ITEM_INVENTORY = 'SET_ITEM_INVENTORY';
export const SET_ITEM_HIDDEN = 'SET_ITEM_HIDDEN';
export const SET_ITEM_DELETED = 'SET_ITEM_DELETED';
export const ADD_ITEM_COMMENT = 'ADD_ITEM_COMMENT';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const REQUEST_USER_ACCOUNT_CREATE = 'REQUEST_USER_ACCOUNT_CREATE';
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const REQUEST_USER_LOGOUT = 'REQUEST_USER_LOGOUT';

export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

export const USERNAME_RESERVED = 'USERNAME_RESERVED';
export const SET_STATE = 'SET_STATE';

export const createItem = (itemID, groupID) => ({
    type: CREATE_ITEM,
    itemID,
    groupID,
});

export const requestItemCreation = (groupID) => ({
    type: REQUEST_ITEM_CREATE,
    groupID
});

export const setItemName = (itemID, name) => ({
    type: SET_ITEM_NAME,
    itemID,
    name
});

export const setItemDesc = (itemID, desc) => ({
    type: SET_ITEM_DESC,
    itemID,
    desc
});

export const setItemImg = (itemID, img) => ({
    type: SET_ITEM_IMG,
    itemID,
    img
});

export const setItemGroup = (itemID, groupID) => ({
    type: SET_ITEM_GROUP,
    itemID,
    groupID
});

export const setItemInventory = (itemID, inventory) => ({
    type: SET_ITEM_INVENTORY,
    itemID,
    inventory
});

export const setItemHidden = (id, isHidden = true) => ({
    type: SET_ITEM_HIDDEN,
    itemID: id,
    isHidden
});

export const setItemDeleted = (id, isDeleted = true) => ({
    type: SET_ITEM_DELETED,
    itemID: id,
    isDeleted
});

export const addItemComment = (commentID, itemID, ownerID, content) => ({
    type: ADD_ITEM_COMMENT,
    id: commentID,
    item: itemID,
    owner: ownerID,
    content
});

export const addToFavorites = (ownerID, itemID) => ({
    type: ADD_TO_FAVORITES,
    item: itemID,
    id: ownerID
});

export const requestCreateUserAccount = (username, password) => ({
    type: REQUEST_USER_ACCOUNT_CREATE,
    username,
    password
});

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});

export const requestUserLogout = () => ({
    type: REQUEST_USER_LOGOUT
});

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
});