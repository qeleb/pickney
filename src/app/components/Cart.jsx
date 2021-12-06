import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemListItem } from './ItemListItem';
import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Cart = ({ id, cart }) => (
    <div className="p-2 m-2">
        <h2><ConnectedUsernameDisplay id={id} />'s cart</h2>
        {cart.map(item => (<ConnectedItemListItem {...item} key={item.id} />))}
    </div>
)

const mapStateToProps = (state) => ({
    id: state.user.id,
    cart: state.user.cart,
 });

export const ConnectedCart = connect(mapStateToProps)(Cart);