import React from 'react';
import { connect } from 'react-redux';
import { history } from '../store';
import { ConnectedItemListItem } from './ItemListItem';
import { removeFromCollection, checkout } from '../store/mutations'

const Cart = ({ state, cart, total, removeFromCollection, checkout }) => (
    <div className="m-5 mb-2" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <div className="card p-5 pt-3 pb-4" style={{ backgroundColor: '#121212'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1><i className="bi bi-cart"></i>&nbsp;cart</h1>
                <h3>total: ${total}</h3>
            </div>
            {cart.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">#</th>
                            <th scope="col" className="col-1">price</th>
                            <th scope="col">item</th>
                            <th scope="col" className="col-1">quantity</th>
                            <th scope="col" className="col-1">remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, i) => (
                        <tr scope="row" key={item.id}>
                            <th>{i + 1}.</th>
                            <th>${state.items.find(i => i.id === item.id).price}</th>
                            <th><ConnectedItemListItem {...{id: item.id}} /></th>
                            <th>{item.quantity}</th>
                            <th><button className="btn btn-danger" onClick={() => removeFromCollection(state.session.id, item.id, 'cart')}><i className="bi bi-x-lg"></i></button></th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            :
                <h3 style={{display: 'flex', justifyContent: 'center'}}>the cart is empty</h3>
            }
            <div className="mt-5" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <button className="btn btn-warning" style={{width: '20%'}} onClick={history.back}><i className="bi bi-arrow-left"></i>&nbsp;go back</button>
                <button className="btn btn-primary" style={{width: '40%'}} onClick={() => checkout(state.session.id, cart)}><i className="bi bi-cart-check"></i>&nbsp;checkout</button>
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    state: state,
    total: state.user.cart.map(i=>i.quantity * state.items.find(j => j.id === i.id).price).reduce((a,b)=>a+b),
    cart: state.user.cart
});

const mapDispatchToProps = (dispatch) => ({
    removeFromCollection: (ownerID, itemID, location) => dispatch(removeFromCollection(ownerID, itemID, location)),
    checkout: (ownerID, cart) => dispatch(checkout(ownerID, cart))
});

export const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);