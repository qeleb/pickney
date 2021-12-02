import { connect } from 'react-redux';
import React from 'react';
import { requestItemCreation } from '../store/mutations'
import { ConnectedItemListItem } from './ItemListItem'

export const ItemList = ({ items, name, createNewItem, id }) => (
    <div className="card p-2 m-2">
        <h2>
            {name}
        </h2>
        <div>
            {items.map(item => (
                <ConnectedItemListItem {...item} key={item.id} />
            ))}
        </div>
        <div>
            <button className="btn btn-primary btn-block mt-2" onClick={() => createNewItem(id)}>Add New</button>
        </div>
    </div>
);

const mapStateToProps = (state, { name, id }) => {
    return {
        name: name,
        items: state.items.filter(item => item.group === id),
        id
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    createNewItem() {
        dispatch(requestItemCreation(id));
    }
});

export const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);