import React from 'react';
// import { Link } from 'react-router-dom'; //TODO: Uncomment when Home page has links
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';
import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Home = ({ id, authenticated }) => (
    <>
        {authenticated ?
            <h1>Hello, <ConnectedUsernameDisplay id={id} /></h1>
            :
            <h1>sign up or log in to explore</h1>
        }
    </>
);

const mapStateToProps = ({ session }) => ({
    id: session.id,
    authenticated: session.authenticated == mutations.AUTHENTICATED
});

export const ConnectedHome = connect(mapStateToProps)(Home);