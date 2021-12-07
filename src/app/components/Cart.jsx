import React from 'react';
import { connect } from 'react-redux';
import { history } from '../store';
import { ConnectedItemListItem } from './ItemListItem';
import { removeFromCollection } from '../store/mutations'

const Cart = ({ id, sessionID, cart, removeFromCollection }) => (
    <div className="m-5 mb-2" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <div className="card p-5 pt-3 pb-4" style={{ backgroundColor: '#121212'}}>
            <h1><i className="bi bi-cart"></i>&nbsp;cart</h1>
            {cart.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">#</th>
                            <th scope="col">item</th>
                            <th scope="col" className="col-1">quantity</th>
                            <th scope="col" className="col-1">remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, i) => (
                        <tr scope="row" key={item.id}>
                            <th>{i + 1}.</th>
                            <th><ConnectedItemListItem {...{id: item.id}} /></th>
                            <th>{item.quantity}</th>
                            <th><button className="btn btn-danger" onClick={() => removeFromCollection(sessionID, item.id, 'cart')}><i className="bi bi-x-lg"></i></button></th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            :
                <h3 style={{display: 'flex', justifyContent: 'center'}}>the cart is empty</h3>
            }
            <div className="mt-5" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <button className="btn btn-warning" style={{width: '20%'}} onClick={history.back}><i className="bi bi-arrow-left"></i>&nbsp;go back</button>
                <button className="btn btn-primary" style={{width: '40%'}}><i className="bi bi-cart-check"></i>&nbsp;checkout</button>
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => ({ id: state.user.id, sessionID: state.session.id, cart: state.user.cart });

const mapDispatchToProps = (dispatch) => ({
    removeFromCollection: (ownerID, itemID, location) => dispatch(removeFromCollection(ownerID, itemID, location))
});

export const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);