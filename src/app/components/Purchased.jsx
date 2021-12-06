import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemListItem } from './ItemListItem';
import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Purchased = ({ id, purchased }) => (
    <div className="p-2 m-2">
            <h2><ConnectedUsernameDisplay id={id} />'s purchased items</h2>
            {purchased.map(item => (<ConnectedItemListItem {...item} key={item.id} />))}
    </div>
);

const mapStateToProps = (state) => ({
    id: state.user.id,
    purchased: state.user.purchased
});

export const ConnectedPurchased = connect(mapStateToProps)(Purchased);