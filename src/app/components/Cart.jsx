import { connect } from 'react-redux';
import React from 'react';
import { ConnectedItemList } from './ItemList';

const Cart = ({ groups }) => (
    <>
        <h2>Cart</h2>
        {groups.filter(group => group.name === 'cart').map(group => (
            <ConnectedItemList key={group.id} {...group} className="col" />
        ))}
    </>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedCart = connect(mapStateToProps)(Cart);