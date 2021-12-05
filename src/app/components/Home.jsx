import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { ConnectedUsernameDisplay } from './UsernameDisplay'
import * as mutations from '../store/mutations';

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