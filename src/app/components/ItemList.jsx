import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { requestItemCreation } from '../store/mutations'
import { ConnectedItemListItem } from './ItemListItem'

const ItemListPages = ({ name, items, id, isAdmin, createNewItem }) => {
    const itemsPerPage = 2;
    const [currentItems, setItems] = useState(items);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ItemList name={name} items={currentItems} id={id} isAdmin={isAdmin} createNewItem={createNewItem} />
            <ReactPaginate
                style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="previous"
                renderOnZeroPageCount={null}
            />
        </div>
    )
};

export const ItemList = ({ name, items, id, isAdmin, createNewItem }) => (
    <div className="p-2 m-2">
        <div style={{ display: 'flex', justifyContent: 'left' }}>
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

export const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemListPages);