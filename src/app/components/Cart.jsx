import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemListItem } from './ItemListItem';

const Cart = ({ cart }) => (
    <div className="mt-5" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="card p-3 col-8" style={{ backgroundColor: '#121212'}}>
            <h1>cart</h1>
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
                    <tr scope="row" key={item}>
                        <th>{i + 1}.</th>
                        <th><ConnectedItemListItem {...{id: item}} /></th>
                        <th>0</th>
                        <th><button className="btn btn-danger">Remove</button></th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    cart: state.user.cart
 });

export const ConnectedCart = connect(mapStateToProps)(Cart);