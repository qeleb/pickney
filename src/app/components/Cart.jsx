import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemList } from './ItemList';
import { ConnectedItemListItem } from './ItemListItem';
import { ConnectedUsernameDisplay } from './UsernameDisplay';


const Cart = ({ name, cart }) => (
    <>  
        <div className="p-2 m-2">
            <h2>{name}'s cart</h2>
                {cart.map(item => (<ConnectedItemListItem {...item} key={item.id} />))}

        </div>
        

    </>
)

const mapStateToProps = (state) => ({ 
    cart: state.user.cart,
    name: state.user.name,


 });

export const ConnectedCart = connect(mapStateToProps)(Cart);