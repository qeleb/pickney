import React from 'react';
import { connect } from 'react-redux';
import { requestItemCreation } from '../store/mutations'
import { ConnectedItemListItem } from './ItemListItem'

export const ItemList = ({ items, name, createNewItem, id }) => (
    <div className="p-2 m-2">
        <div style={{display:'flex', justifyContent:'left'}}>
            <h2>{name}</h2>
            <button className="btn btn-secondary btn-block ms-3" onClick={() => createNewItem(id)}>+</button> {/* TODO: Only Show for Admins */}
        </div>
        <div className="item-grid">
            {items.map(item => (<ConnectedItemListItem {...item} key={item.id} />))}
        </div>
    </div>
);

const mapStateToProps = (state, { name, id }) => ({
    name: name,
    items: state.items.filter(item => item.group.includes(id)),
    id
});

const mapDispatchToProps = (dispatch, { id }) => ({
    createNewItem: () => dispatch(requestItemCreation(id))
});

export const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);