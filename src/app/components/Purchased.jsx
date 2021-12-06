import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemList } from './ItemList';
import { ConnectedItemListItem } from './ItemListItem';


const Purchased = ({ name, purchased }) => (
    <>
        <div className="p-2 m-2">
                <h2>{name}'s purchased items</h2>
                    {purchased.map(item => (<ConnectedItemListItem {...item} key={item.id} />))}

        </div>
    </>
);

const mapStateToProps = (state) => ({ 
    purchased: state.user.purchased,
    name: state.user.name
});

export const ConnectedPurchased = connect(mapStateToProps)(Purchased);