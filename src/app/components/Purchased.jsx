import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemListItem } from './ItemListItem';
import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Purchased = ({ id, purchased }) => (
    <div className="p-2 m-2">
        <h1 className="mt-2 mb-3"><ConnectedUsernameDisplay id={id} />'s purchased items</h1>
        {purchased.map(item => (<ConnectedItemListItem {...{id: item}} key={item} />))}
    </div>
);

const mapStateToProps = (state) => ({
    id: state.user.id,
    purchased: state.user.purchased
});

export const ConnectedPurchased = connect(mapStateToProps)(Purchased);