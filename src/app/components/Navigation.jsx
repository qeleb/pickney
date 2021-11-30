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
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <Link to="/dashboard" className="h1 text-decoration-none">pickney</Link>
                {authenticated ?
                    <>
                        <Link to="/browse" className="h3 text-decoration-none">browse</Link>
                        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to="/cart" className="h2 m-0 me-5"><i className="bi bi-cart-fill"></i></Link>

                            {/* User Button & Dropdown */}
                            <div class="dropstart">
                                <button class="btn btn-primary" type="button" id="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-fill"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="user-dropdown">
                                    <li><Link to="/" className="h2 text-decoration-none">
                                        <i className="bi bi-person-fill"></i>
                                        <ConnectedUsernameDisplay id={id} />
                                    </Link></li>
                                    <li><hr class="dropdown-divider"></hr></li>
                                    <li><Link to="/favorites" className="h3 text-decoration-none">favorites</Link></li>
                                    <li><Link to="/history" className="h3 text-decoration-none">history</Link></li>
                                </ul>
                            </div>
                        </span>
                    </>
                    :
                    <Link to="/" className="h1 m-0"><i class="bi bi-person"></i></Link>
                }
            </div>
        </nav>
    </div>
);

const mapStateToProps = ({ session }) => ({
    id: session.id,
    authenticated: session.authenticated == mutations.AUTHENTICATED
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);