import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { requestItemCreation, searchItems } from '../store/mutations'
import { ConnectedItemListItem } from './ItemListItem'

const ItemListPages = ({ name, items, id, isAdmin, createNewItem, searchItems }) => {
    const itemsPerPage = 3;
    const [currentItems, setItems] = useState(items);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className="input-group mt-3">
                <input type="text" onChange={searchItems} className="form-control form-control-lg" />
            </div>
            <ItemList name={name} items={currentItems} id={id} isAdmin={isAdmin} createNewItem={createNewItem} />
            <ReactPaginate
                style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}
                previousLabel="<<"
                nextLabel=">>"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center"
                activeClassName="active"
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
    items: state.items[0].searchResults ? state.items[0].searchResults.filter(item => item.group.includes(id)) : state.items.filter(item => item.group.includes(id)),
    id,
    isAdmin: state.user.isAdmin
});

const mapDispatchToProps = (dispatch, { id }) => ({
    createNewItem: () => dispatch(requestItemCreation(id)),
    searchItems: (e) => dispatch(searchItems(e.target.value))
});

export const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export const ConnectedItemListPages = connect(mapStateToProps, mapDispatchToProps)(ItemListPages);