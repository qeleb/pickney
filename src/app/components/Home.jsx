import React from 'react';
import { Link } from 'react-router-dom'; //TODO: Uncomment when Home page has links
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';
import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Home = ({ id, authenticated }) => (
    <div className="m-5 mb-2" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <div className="card p-5 pt-3 pb-4" style={{ backgroundColor: '#121212'}}>
            <div className="mb-5" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1><i className="bi bi-house"></i>&nbsp;home</h1>
                {authenticated ?
                    <h3><ConnectedUsernameDisplay id={id} /></h3>
                :
                    <h3>not logged in</h3>
                }
            </div>
            {authenticated ?
                <div className="mt-5" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Link to='/browse' className="btn btn-primary" style={{width: '40%'}}><i className="bi bi-cart-check"></i>&nbsp;browse all</Link>
                    <Link to='/sale' className="btn btn-secondary" style={{width: '40%'}}><i className="bi bi-coin"></i>&nbsp;check out sales</Link>
                </div>
            :
                <>
                    <div className="my-5" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <h3>welcome to pickney</h3>
                        <p>pickney is the place to go for youth clothing.</p>
                        <p>sign up or log in to start exploring our exclusive clothing items.</p>
                    </div>
                    <div className="mt-5" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Link to='/signup' className="btn btn-primary" style={{width: '40%'}}><i className="bi bi-person"></i>&nbsp;sign up</Link>
                        <Link to='/login' className="btn btn-secondary" style={{width: '40%'}}><i className="bi bi bi-person-plus"></i>&nbsp;log in</Link>
                    </div>
                </>
            }
        </div>
    </div>
);

const mapStateToProps = ({ session }) => ({
    id: session.id,
    authenticated: session.authenticated == mutations.AUTHENTICATED
});

export const ConnectedHome = connect(mapStateToProps)(Home);