import React from 'react';
import { connect } from 'react-redux';
import { history } from '../store';
import { ConnectedItemListItem } from './ItemListItem';

const Cart = ({ cart }) => (
    <div className="m-5 mb-2" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <div className="card p-5 pt-3 pb-4" style={{ backgroundColor: '#121212'}}>
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
            <div className="mt-3" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <button className="btn btn-warning" style={{width: '20%'}} onClick={history.back}><i className="bi bi-arrow-left"></i>&nbsp;go back</button>
                <button className="btn btn-primary" style={{width: '40%'}}><i className="bi bi-star"></i>&nbsp;checkout</button>
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    cart: state.user.cart
 });

export const ConnectedCart = connect(mapStateToProps)(Cart);