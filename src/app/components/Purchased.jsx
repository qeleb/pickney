import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemListItem } from './ItemListItem';

const Purchased = ({ purchased }) => (
    <div className="p-2 m-2">
        {console.log('PURCHASED', purchased)}
        <h1 className="mt-2 mb-3"><i className="bi bi-clock-history"></i>&nbsp;purchased items</h1>
        {purchased.map(item => (<ConnectedItemListItem {...{id: item}} key={item} />))}
    </div>
);

const mapStateToProps = (state) => ({ purchased: state.user.purchased });

export const ConnectedPurchased = connect(mapStateToProps)(Purchased);