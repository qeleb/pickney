import { connect } from 'react-redux';
import React from 'react';
import { ConnectedItemList } from './ItemList';

const Favorites = ({ groups }) => (
    <>
        {groups.filter(group => group.name === 'favorites').map(group => (
            <ConnectedItemList key={group.id} {...group} />
        ))}
    </>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedFavorites = connect(mapStateToProps)(Favorites);