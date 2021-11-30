/**
 * The navigation component is present on all non-login pages,
 * and contains a link back to the dashboard, and the user's name.
 */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { ConnectedUsernameDisplay } from './UsernameDisplay'
import * as mutations from '../store/mutations';

const Navigation = ({ id, authenticated }) => (
    <div className="header">
        <Link to="/dashboard"><h1>pickney</h1></Link>

        {authenticated ?
            <h4>Welcome, <ConnectedUsernameDisplay id={id} />!</h4>
            :
            <h4>login to start shopping</h4>
        }
    </div>
);

const mapStateToProps = ({ session }) => ({
    id: session.id,
    authenticated: session.authenticated == mutations.AUTHENTICATED
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);