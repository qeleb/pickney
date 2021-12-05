import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import logo from '../../../public/stylesheet.css';

import { ConnectedUsernameDisplay } from './UsernameDisplay'
import * as mutations from '../store/mutations';

const Navigation = ({ id, authenticated, logout }) => (
    <div className="header masthead">
        <nav className="navbar nav-masthead pt-4">
            <div className="container-fluid">
                <Link to="/" className="h1 masthead-brand">
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
                                        <Link to="/login" onClick={logout}><i className="bi bi-box-arrow-right me-3"></i>log out</Link>
                                    </li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li>
                                        <Link to="/favorites" className="h4"><i className="bi bi-star me-3"></i>favorites</Link>
                                    </li>
                                    <li>
                                        <Link to="/purchased" className="h4"><i className="bi bi-clock-history me-3"></i>purchased</Link>
                                    </li>
                                </ul>
                            </div>
                        </span>
                    </>
                    :
                    <Link to="/login" className="h1 m-0"><i className="bi bi-person"></i></Link>
                }
            </div>
        </nav>
    </div>
);

const mapStateToProps = ({ session }) => {
    console.log('SESSION', session);
    return {
        id: session.id,
        authenticated: session.authenticated == mutations.AUTHENTICATED
    }
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(mutations.requestUserLogout())
});

export const ConnectedNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation);