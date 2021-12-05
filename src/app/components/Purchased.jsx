import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemList } from './ItemList';

const Purchased = ({ groups }) => (
    <>
        {groups.filter(group => group.name === 'purchased').map(group => (
            <ConnectedItemList key={group.id} {...group} />
        ))}
    </>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedPurchased = connect(mapStateToProps)(Purchased);