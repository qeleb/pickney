import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemList } from './ItemList';

const Cart = ({ groups }) => (
    <>
        {groups.filter(group => group.name === 'cart').map(group => (
            <ConnectedItemList key={group.id} {...group} />
        ))}
    </>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedCart = connect(mapStateToProps)(Cart);