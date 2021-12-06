import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemListItem } from './ItemListItem';

const Favorites = ({ favorites }) => (
    <div className="p-2 m-2">
        <h1 className="mt-2 mb-3"><i className="bi bi-star"></i>&nbsp;favorites</h1>
        {favorites.map(item => (<ConnectedItemListItem {...{id: item}} key={item} />))}
    </div>
);

const mapStateToProps = (state) => ({ favorites: state.user.favorites });

export const ConnectedFavorites = connect(mapStateToProps)(Favorites);