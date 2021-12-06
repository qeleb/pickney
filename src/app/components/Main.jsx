import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { store, history } from '../store';
import { ConnectedNavigation } from './Navigation'
import { ConnectedHome } from './Home'
import { ConnectedLogin } from './Login'
import { ConnectedSignup } from './Signup'
import { ConnectedCart } from './Cart'
import { ConnectedFavorites } from './Favorites'
import { ConnectedPurchased } from './Purchased'
import { ConnectedBrowseAll, ConnectedBrowseBoys, ConnectedBrowseGirls, ConnectedBrowseSale } from './Browse'
import { ConnectedItemDetail } from './ItemDetail'

// Get Global Styles
import styles from '../../../public/stylesheet.css';

const RouteGuard = Component => ({ match }) =>
    !store.getState().session.authenticated ?
        <Redirect to="/" />
        :
        <Component match={match} />;

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div className="container">
                <ConnectedNavigation />
                <Route exact path="/" component={ConnectedHome} />
                <Route exact path="/login" component={ConnectedLogin} />
                <Route exact path="/signup" component={ConnectedSignup} />
                <Route exact path="/browse" render={RouteGuard(ConnectedBrowseAll)} />
                <Route exact path="/boys" render={RouteGuard(ConnectedBrowseBoys)} />
                <Route exact path="/girls" render={RouteGuard(ConnectedBrowseGirls)} />
                <Route exact path="/sale" render={RouteGuard(ConnectedBrowseSale)} />
                <Route exact path="/cart" render={RouteGuard(ConnectedCart)} />
                <Route exact path="/favorites" render={RouteGuard(ConnectedFavorites)} />
                <Route exact path="/purchased" render={RouteGuard(ConnectedPurchased)} />
                <Route exact path="/item/:id" render={RouteGuard(ConnectedItemDetail)} />
            </div>
        </Provider>
    </Router>
);