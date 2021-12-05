import React from 'react';
import { connect } from 'react-redux';
import { requestItemCreation } from '../store/mutations'
import { ConnectedItemListItem } from './ItemListItem'

export const ItemList = ({ name, items, id, isAdmin, createNewItem }) => (
    <div className="p-2 m-2">
        <div style={{display:'flex', justifyContent:'left'}}>
            <h1>{name}</h1>
            {isAdmin && <button className="btn btn-secondary btn-block ms-3" onClick={() => createNewItem(id)}>+</button>}
        </div>
        <div className="item-grid">
            {items.map(item => (<ConnectedItemListItem {...item} key={item.id} />))}
        </div>
    </div>
);

const mapStateToProps = (state, { name, id }) => ({
    name: name,
    items: state.items.filter(item => item.group.includes(id)),
    id,
    isAdmin: state.user.isAdmin
});

const mapDispatchToProps = (dispatch, { id }) => ({
    createNewItem: () => dispatch(requestItemCreation(id))
});

export const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);