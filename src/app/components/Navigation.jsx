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
    <div className="header masthead">
        <nav className="navbar nav-masthead pt-4">
            <div className="container-fluid">
                <Link to="/dashboard" className="h1 masthead-brand">
                    <img className="logo" alt="pickney logo" src="public/logo.png" />
                    pickney
                </Link>
                {authenticated ?
                    <>
                        <Link to="/browse" className="h3">browse</Link>
                        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to="/cart" className="h2 m-0 me-5"><i className="bi bi-cart-fill"></i></Link>

                            {/* User Button & Dropdown */}
                            <div className="dropstart">
                                <button className="btn btn-primary" type="button" id="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-fill"></i>
                                </button>
                                <ul className="dropdown-menu p-2" aria-labelledby="user-dropdown">
                                    <li>
                                        <i className="bi bi-person-fill me-3 primary"></i>
                                        <ConnectedUsernameDisplay id={id} />
                                    </li>
                                    <li>
                                        <Link to="/"><i className="bi bi-person-plus me-3"></i>change user</Link>
                                    </li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li>
                                        <Link to="/favorites" className="h4"><i className="bi bi-star me-3"></i>favorites</Link>
                                    </li>
                                    <li>
                                        <Link to="/history" className="h4"><i className="bi bi-clock-history me-3"></i>history</Link>
                                    </li>
                                </ul>
                            </div>
                        </span>
                    </>
                    :
                    <Link to="/" className="h1 m-0"><i className="bi bi-person"></i></Link>
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