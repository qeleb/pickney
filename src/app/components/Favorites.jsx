import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemList } from './ItemList';
import { ConnectedItemListItem } from './ItemListItem';

const Favorites = ({ name, favorites }) => (
    <>
        <div className="p-2 m-2">
            <h2>{name}'s favorites</h2>
            {favorites.map(item => (<ConnectedItemListItem {...item} key={item.id} />))}
        </div>
    </>
);

const mapStateToProps = ( state ) => ({ 
    favorites: state.user.favorites,
    name: state.user.name
 });

export const ConnectedFavorites = connect(mapStateToProps)(Favorites);